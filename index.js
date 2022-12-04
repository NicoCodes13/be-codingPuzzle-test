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

// stores data (value) by key
async function cache_store(key, value) {
  if (key === 0) {
    throw new Error('No data found');
  }
  setTimeout(() => {
    console.log(`data ${value} store in ${key} key `);
  }, 3000);
}
//retrives data by key (if it exists)
async function cache_retrieve(key) {
  let promise = new Promise((resolve, reject) => {
    if (key === 0) {
      setTimeout(() => reject(new Error('something go wrong')), 1000);
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
      setTimeout(() => reject(new Error('something go wrong')), 3000);
    } else {
      setTimeout(() => resolve(Data[input - 1]), 3000);
    }
  });

  let result = await promise; // espera hasta que la promesa se resuelva (*)

  return result;
}
function memoize(slow_funtion) {
  slow_funtion.then((data) => console.log(data));
  return fast_function;
}

memoize(slow_funtion(1));
