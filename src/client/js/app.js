function validateInput(data) {
    if(data.to == "") {
        alert('Please fill out your destinaton city');
        return false;
    } else if(data.from == "") {
        alert('Please fill out your departure city');
        return false;
    } else if (data.startDate == "") {
        alert('Please select your start date');
        return false;
    } else if (data.endDate == "") {
        alert('Please select your end date');
        return false;
    }
    return true;
}

async function handleSubmit(that) {
    let projectData = {};

    let userData = {
        to: that.to.value,
        from: that.from.value,
        startDate: that.depart.value,
        endDate: that.return.value
    };
    await Client.validateInput(userData);
    projectData = Client.handleDates(userData.startDate, userData.endDate);

    const coordinates = await Client.getData('/getLocation', { location: userData.to})

    const weather = await Client.getData('/getWeather', { lat: coordinates.lat, long: coordinates.long });
    
    let forecastDay = 0;
    if(projectData.isSoon) {
        forecastDay = projectData.countdown;
    }
    const weatherData = {
        city: weather.city_name,
        high_temp: weather.data[forecastDay].high_temp,
        low_temp: weather.data[forecastDay].low_temp,
        forecast: weather.data[forecastDay].weather.description
    }

    const image = await Client.getData('/getPhoto', { city: userData.to });
    projectData.image_url = image.hits[0].largeImageURL;

    Object.assign(projectData, weatherData);
}

async function getData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

function handleDates(startDate, endDate) {
    const today = new Date();
    const depart = new Date(startDate);
    const returnDate = new Date(endDate);
    let isSoon = false;

    const countdown = Math.round((depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)); 
    const duration = Math.ceil((returnDate.getTime() - depart.getTime()) / (1000 * 60 * 60 * 24));

    if(countdown < 16) {
        isSoon = true;
    }
    return { depart: startDate, duration: duration, countdown: countdown + 1, isSoon: isSoon};
}

export { validateInput, handleSubmit, getData, handleDates };