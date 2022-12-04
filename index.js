let Data = [
  {
    id: 1,
    first_name: 'Jeanette',
    last_name: 'Penddreth',
    email: 'jpenddreth0@census.gov',
    gender: 'Female',
  },
  {
    id: 2,
    first_name: 'Giavani',
    last_name: 'Frediani',
    email: 'gfrediani1@senate.gov',
    gender: 'Male',
  },
  {
    id: 3,
    first_name: 'Noell',
    last_name: 'Bea',
    email: 'nbea2@imageshack.us',
    gender: 'Female',
  },
  {
    id: 4,
    first_name: 'Willard',
    last_name: 'Valek',
    email: 'wvalek3@vk.com',
    gender: 'Male',
  },
];
let cache = [
  {
    id: 1,
    first_name: 'Jeanette',
    last_name: 'Penddreth',
    email: 'jpenddreth0@census.gov',
    gender: 'Female',
  },
  {
    id: 2,
    first_name: 'Giavani',
    last_name: 'Frediani',
    email: 'gfrediani1@senate.gov',
    gender: 'Male',
  },
  {
    id: 3,
    first_name: 'Noell',
    last_name: 'Bea',
    email: 'nbea2@imageshack.us',
    gender: 'Female',
  },
  {
    id: 4,
    first_name: 'Willard',
    last_name: 'Valek',
    email: 'wvalek3@vk.com',
    gender: 'Male',
  },
];

// stores data (value) by key
async function cache_store(key, value) {
  if (key === 0) {
    throw new Error('No data found');
  }
  setTimeout(() => {
    console.log(`data ${value} store in ${key} key `);
  }, 100);
}
//retrives data by key (if it exists)
async function cache_retrieve(key) {
  let promise = new Promise((resolve, reject) => {
    if (key === 0) {
      setTimeout(() => reject(new Error('Error en cache retrive'), 3000));
    } else {
      setTimeout(() => resolve(Data[key - 1]), 1000);
    }
  });

  let result = await promise; // espera hasta que la promesa se resuelva (*)

  return result;
}
//fetch data from slow data source
async function slow_funtion(input) {
  let promise = new Promise((resolve, reject) => {
    if (input === 0) {
      setTimeout(() => reject(new Error('Error in slow function'), 3000));
    } else {
      setTimeout(() => resolve(Data[input - 1]), 5000);
    }
  });

  let result = await promise; // espera hasta que la promesa se resuelva (*)

  return result;
}
let promise = new Promise((resolve, reject) => resolve(2));

//assuming that the key and the input be the same

// i add a new parameter to make easier the invoke of functions
// this function return a promise depending on which function finishes first
// knowing that asyn functions return a promise i use this to with asynchronism
// always store the new data in cache even when the data be return.
function memoize(slow_funtion, key) {
  return new Promise(function (resolve, reject) {
    slow_funtion(key)
      .then((data) => {
        cache_store(data['id'] - 1, data);
        resolve(data);
      })
      .catch((err) => reject(err));
    cache_retrieve(key)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
}
memoize(slow_funtion, 2)
  .then((data) => console.log(data))
  .catch((err) => console.error(err.message));
// // ! Bonus Answer
// to have 95% accuracy knowing that the cached data
// its accuracy is approximately 1000 seconds
// we can take that 5% of accuracy to generate a window
// of aprox 950 seconds more to TTL were the accuracy be 95%
// so if we want a 95% accuracy in the catched data de TTL
// should be 1950 seconds
