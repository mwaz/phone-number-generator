import store from 'store-js';


beforeEach(async() => {
    store.set('phonenumbers', JSON.stringify([]));
})

after(async() => {
     store.remove('phonenumbers');
    await process.exit(0);
})