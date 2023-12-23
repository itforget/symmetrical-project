'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clima= () => {
 const [data, setData] = useState({});
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await axios(
          'https://api.openweathermap.org/data/2.5/weather?q=Brasilia&appid=15adb0e63c5f05a578a664adfab9d816&units=metric'
        );

        setData(result.data);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    fetchData();
 }, []);

 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error}</p>;

 const ColorTemp = () => {
   const temperature = data.main.temp;

   if (temperature > 28) {
     return "text-red-500";
   } else if (temperature > 15) {
     return "text-blue-500";
   }
 };

 return (
    <div className='border-blue-400 flex flex-col p-10 border-2 place-content-center mx-72 rounded-3xl text-gray-300'>
      <h1 className='flex place-content-center font-extrabold text-2xl'>Temperatura atual em {data.name}</h1>
      <ul className='flex flex-col gap-5 place-content-center mt-10 content-center p-10 items-center'>
         <li className={`text-xl font-bolder ${ColorTemp()}`}>Temperatura: {data.main.temp}°C</li>
         <li className='text-xl'>Umidade: {data.main.humidity}%</li>
         <li className='text-xl'>Pressão atmosférica: {data.main.pressure}hPa</li>
         <li><img className=' flex place-content-center' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} width={100} height={100} alt={data.weather[0].description} /></li>
      </ul>
    </div>
 );
};

export default Clima;