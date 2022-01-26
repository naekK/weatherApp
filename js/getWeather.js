window.addEventListener('load', () => {

    // to get api result
    let lon;
    let lat;

    // DOM elements
    let getTimeText = document.querySelector(".headertext-gettime");
    let locationName = document.querySelector(".headertext-location");
    let humidityDescription = document.querySelector(".humidity-description");
    let hpDescription = document.querySelector(".hp-description");
    let temperatureDegree = document.querySelector(".temperature-digree");    
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureSection = document.querySelector(".temperature-section");
    let temperatureMax = document.querySelector(".temperature-max");
    let temperatureMin = document.querySelector(".temperature-min");
    let digreeSectionSpan = document.querySelector(".digree-section span");
    let digreeSectionMinSpan = document.querySelector(".digree-section-min span");
    let digreeSectionMaxSpan = document.querySelector(".digree-section-max span")

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            console.log('lon: '+lon+' lat: '+lat);
            //get送信、戻り値取得
            jQuery.getJSON("./openWeatherCall.php", {
                //必要に応じてAPI用のパラメータをセットする
                longitude: lon,
                latitude: lat
            })
            .done(function(result){
                //データ表示
                console.log('done');
                console.log(result);
                const {temp, feels_like, temp_max, temp_min, pressure, humidity} = result.main;
                const locationCity = result.name;   //場所
                const description = result.weather[0].description;  //説明
                const weatherIcon = result.weather[0].icon;
                const dt = Date(result.dt);      //取得時間
                const temp_f = temp*(5/9)+32;
                const temp_max_f = temp_max*(5/9)+32;
                const temp_min_f = temp_min*(5/9)+32;

                locationName.textContent = locationCity;
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                getTimeText.textContent = dt+' 更新';
                humidityDescription.textContent = '湿度 '+humidity;
                hpDescription.textContent = '気圧 '+pressure;
                temperatureMax.textContent = '最高気温 '+temp_max;
                temperatureMin.textContent = '最低気温 '+temp_min;
                // iconセット
                setIcon(weatherIcon,document.querySelector(".weather-icon"));

                // change temperature unit
                temperatureSection.addEventListener("click", () => {
                    if(digreeSectionSpan.textContent === "F"){
                        digreeSectionSpan.textContent = "C";
                        digreeSectionMinSpan.textContent = "C";
                        digreeSectionMaxSpan.textContent = "C";
                        temperatureDegree.textContent = temp;
                        temperatureMax.textContent = '最高気温 ' + temp_max;
                        temperatureMin.textContent = '最低気温 ' + temp_min;
                    } else {
                        digreeSectionSpan.textContent = "F";
                        digreeSectionMinSpan.textContent = "F";
                        digreeSectionMaxSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temp_f);
                        temperatureMax.textContent = '最高気温 ' + Math.floor(temp_max_f);
                        temperatureMin.textContent = '最低気温 ' + Math.floor(temp_min_f);
                    }
                });
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.log('エラー'+textStatus);
                console.log("テキスト：" + jqXHR.responseText);
            }).always(function() {
                console.log("完了");
            });
        });

    } else {
        console.log('geolocationに対応していない');
    }

    function setIcon(icon, iconID) {
        var skycons = new Skycons({"color":"white"});
        let skyconsIcon;
        switch(icon){
            case '01d':
                skyconsIcon = Skycons.CLEAR_DAY;
                break;
            
            case '02d':
                skyconsIcon = Skycons.PARTLY_CLOUDY_DAY;
                break;
            
            case '03d':
                skyconsIcon = Skycons.CLOUDY;
                break;

            case '04d':
                skyconsIcon = Skycons.CLOUDY;
                break;

            case '09d':
                skyconsIcon = Skycons.SLEET;
                break;

            case '10d':
                skyconsIcon = Skycons.RAIN;
                break;

            case '11d':
                skyconsIcon = Skycons.WIND;
                break;

            case '13d':
                skyconsIcon = Skycons.SNOW;
                break;

            case '50d':
                skyconsIcon = Skycons.FOG;
                break;
            
            case '01n':
                skyconsIcon = Skycons.CLEAR_NIGHT;
                break;
            
            case '02n':
                skyconsIcon = Skycons.PARTLY_CLOUDY_NIGHT;
                break;
            
            case '03n':
                skyconsIcon = Skycons.CLOUDY;
                break;

            case '04n':
                skyconsIcon = Skycons.CLOUDY;
                break;

            case '09n':
                skyconsIcon = Skycons.SLEET;
                break;

            case '10n':
                skyconsIcon = Skycons.RAIN;
                break;

            case '11n':
                skyconsIcon = Skycons.WIND;
                break;

            case '13n':
                skyconsIcon = Skycons.SNOW;
                break;

            case '50n':
                skyconsIcon = Skycons.FOG;
                break;
        
            default:
            skyconsIcon = Skycons.CLEAR_DAY;
            break;
            
        }
        skycons.play();
        console.log(skyconsIcon);
        return skycons.set(iconID, skyconsIcon);
    }

});