// Load Testing Script
// Simulates 1,000-10,000 concurrent users

const http = require('http');

const API_URL = 'http://localhost:3000';
const CONCURRENT_USERS = 1000;
const REQUESTS_PER_USER = 10;

const results = {
  total: 0,
  success: 0,
  failed: 0,
  totalTime: 0,
  responseTimes: []
};

async function makeRequest(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: endpoint,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        resolve({ statusCode: res.statusCode, responseTime, data });
      });
    });

    req.on('error', (error) => {
      const responseTime = Date.now() - startTime;
      reject({ error, responseTime });
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function simulateUser(userId) {
  const userResults = [];

  for (let i = 0; i < REQUESTS_PER_USER; i++) {
    try {
      const result = await makeRequest('/api/validation/validate-product', 'POST', {
        productName: `Test Product ${userId}-${i}`,
        productId: `${userId}${i}`
      });

      results.total++;
      results.success++;
      results.responseTimes.push(result.responseTime);
      results.totalTime += result.responseTime;

      userResults.push({ success: true, time: result.responseTime });
    } catch (error) {
      results.total++;
      results.failed++;
      userResults.push({ success: false, error: error.message });
    }
  }

  return userResults;
}

async function runLoadTest() {
  console.log('🚀 Starting Load Test...');
  console.log(`📊 Concurrent Users: ${CONCURRENT_USERS}`);
  console.log(`📈 Requests per User: ${REQUESTS_PER_USER}`);
  console.log(`🎯 Total Requests: ${CONCURRENT_USERS * REQUESTS_PER_USER}`);
  console.log('');

  const startTime = Date.now();

  // Create array of user simulations
  const users = [];
  for (let i = 0; i < CONCURRENT_USERS; i++) {
    users.push(simulateUser(i));
  }

  // Run all users concurrently
  await Promise.all(users);

  const totalTime = Date.now() - startTime;

  // Calculate statistics
  const avgResponseTime = results.totalTime / results.success;
  const sortedTimes = results.responseTimes.sort((a, b) => a - b);
  const p50 = sortedTimes[Math.floor(sortedTimes.length * 0.5)];
  const p95 = sortedTimes[Math.floor(sortedTimes.length * 0.95)];
  const p99 = sortedTimes[Math.floor(sortedTimes.length * 0.99)];
  const minTime = Math.min(...sortedTimes);
  const maxTime = Math.max(...sortedTimes);
  const requestsPerSecond = (results.total / (totalTime / 1000)).toFixed(2);

  // Print results
  console.log('\n📊 LOAD TEST RESULTS\n');
  console.log('='.repeat(50));
  console.log(`Total Time: ${(totalTime / 1000).toFixed(2)}s`);
  console.log(`Total Requests: ${results.total}`);
  console.log(`Successful: ${results.success} (${((results.success / results.total) * 100).toFixed(2)}%)`);
  console.log(`Failed: ${results.failed} (${((results.failed / results.total) * 100).toFixed(2)}%)`);
  console.log(`Requests/sec: ${requestsPerSecond}`);
  console.log('');
  console.log('Response Times:');
  console.log(`  Min: ${minTime}ms`);
  console.log(`  Max: ${maxTime}ms`);
  console.log(`  Avg: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`  P50: ${p50}ms`);
  console.log(`  P95: ${p95}ms`);
  console.log(`  P99: ${p99}ms`);
  console.log('='.repeat(50));

  // Performance assessment
  console.log('\n🎯 PERFORMANCE ASSESSMENT\n');
  
  if (avgResponseTime < 100) {
    console.log('✅ EXCELLENT - Average response time under 100ms');
  } else if (avgResponseTime < 500) {
    console.log('✅ GOOD - Average response time under 500ms');
  } else if (avgResponseTime < 1000) {
    console.log('⚠️  ACCEPTABLE - Average response time under 1s');
  } else {
    console.log('❌ POOR - Average response time over 1s');
  }

  if (results.failed === 0) {
    console.log('✅ EXCELLENT - Zero failed requests');
  } else if (results.failed / results.total < 0.01) {
    console.log('✅ GOOD - Less than 1% failure rate');
  } else if (results.failed / results.total < 0.05) {
    console.log('⚠️  ACCEPTABLE - Less than 5% failure rate');
  } else {
    console.log('❌ POOR - High failure rate');
  }

  console.log('\n✅ Load test complete!\n');
}

// Check if server is running
makeRequest('/health')
  .then(() => {
    console.log('✅ Server is running, starting load test...\n');
    runLoadTest();
  })
  .catch(() => {
    console.error('❌ Server is not running!');
    console.error('Please start the server first: npm start');
    process.exit(1);
  });
