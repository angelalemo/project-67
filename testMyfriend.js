const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function testFriendAppSlowMotion() {
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();

  try {
    console.log('👉 Step 1: Open Website');
    await driver.get('http://localhost:3000');
    await sleep(3000);

    await driver.wait(until.elementLocated(By.className('person-card')), 5000);
    
    let cards = await driver.findElements(By.className('person-card'));
    console.log(`   🔎 Found: ${cards.length} friends`);
    assert.strictEqual(cards.length, 3, 'Initial count mismatch');
    console.log('   ✅ PASS: Initial list loaded');

    await sleep(2000);

    console.log('👉 Step 2: Search "Golf"');
    let searchBox = await driver.findElement(By.css('input[type="text"]'));
    
    await searchBox.sendKeys('G'); await sleep(300);
    await searchBox.sendKeys('o'); await sleep(300);
    await searchBox.sendKeys('l'); await sleep(300);
    await searchBox.sendKeys('f'); await sleep(300);

    console.log('   ...Filtering...');
    await sleep(3000);

    let filteredCards = await driver.findElements(By.className('person-card'));
    assert.strictEqual(filteredCards.length, 1, 'Filter failed');

    let nameText = await filteredCards[0].findElement(By.tagName('h2')).getText();
    console.log(`   🔎 Result: ${nameText}`);
    
    if (nameText.includes('Supachai')) {
        console.log('   ✅ PASS: Search correct');
    }

    await sleep(2000);

    console.log('👉 Step 3: Clear Search');
    await searchBox.clear();
    await searchBox.sendKeys(' ');
    await searchBox.sendKeys('\uE003');

    await sleep(2000);

    let allCardsAgain = await driver.findElements(By.className('person-card'));
    if (allCardsAgain.length === 3) {
        console.log('   ✅ PASS: List restored');
    }

    console.log('🎉🎉🎉 SUCCESS 🎉🎉🎉');
    await sleep(5000);

  } catch (error) {
    console.error('🚨 Error:', error);
  } finally {
    await driver.quit();
  }
})();