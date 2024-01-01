import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  function reduceDuplicates(arr) {
    const newHashMap = new Map();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].country !== newHashMap.get(arr[i].country)?.country) {
        newHashMap.set(arr[i].country, {
          id: arr[i].id,
          country: arr[i].country,
          emoji: arr[i].emoji,
        });
      }
    }
    const convertedBackToArray = [...newHashMap.values()];
    return convertedBackToArray;
  }

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country)) {
  //     console.log(city);
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   } else {
  //     return arr;
  //   }
  // }, []);

  const countries = reduceDuplicates(cities);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.id} />;
      })}
    </ul>
  );
}
export default CountryList;
