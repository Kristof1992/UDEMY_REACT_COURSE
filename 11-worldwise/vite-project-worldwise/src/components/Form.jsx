// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0";

const key = "695d11637b8d411aa3d2facca596aaaa";
const BASE_URL = "https://api.geoapify.com/v1/geocode/reverse";

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";

import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [geocodingError, setGeocodingError] = useState();

  useEffect(() => {
    async function fetchCityData() {
      if (!lat && !lng) return;
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(
          `${BASE_URL}?lat=${lat}&lon=${lng}&apiKey=${key}`,
          {
            method: "GET",
          }
        );

        const data = await res.json();

        const {
          features: {
            0: {
              properties: { city, country, country_code },
            },
          },
        } = data;

        if (!country_code) {
          throw new Error(
            `That doesn't seem to be a city. Click somewhere else 😉`
          );
        }

        setCityName(city || "");
        setCountry(country);
        setEmoji(convertToEmoji(country_code));
        // setDate(date);
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(date);

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate(`/app/cities`);
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return (
      <Message message={`Start by clicking somewhere on the map`}></Message>
    );

  if (geocodingError) return <Message message={geocodingError}></Message>;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        ></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={`primary`}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
