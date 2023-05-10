// 获取表单元素和展示天气信息的元素
const form = document.getElementById("city-form");
const result = document.getElementById("result");

// 获取展示城市名、天气信息和气温信息的元素
const cityElement = document.querySelector(".city");
const weatherElement = document.querySelector(".weather");
const temperatureElement = document.querySelector(".temperature");

// 添加表单提交事件监听器
form.addEventListener("submit", (event) => {
  // 阻止表单默认提交行为
  event.preventDefault();

  // 获取用户输入的城市名
  const city = document.getElementById("city").value.trim();

  // 如果城市名为空，提示用户输入城市名并终止代码执行
  if (city === "") {
    alert("请输入城市名");
    return;
  }

  // 天气数据 API 的主机名、路径、请求方法、AppCode 和请求参数
  const host = "https://ali-weather.showapi.com";
  const path = "/area-to-weather-date";
  const method = "GET";
  const appcode = "0ce496b9c1384aaf9f068484149a24ba";
  const querys = `area=${encodeURIComponent(city)}&need3HourForcast=0`;

  // 构建完整的 API 请求 URL
  const url = `${host}${path}?${querys}`;

  // 发起 API 请求
  fetch(url, {
    method: method,
    headers: {
      Authorization: `APPCODE ${appcode}`,
    },
  })
    .then((response) => response.json()) // 将响应数据转换为 JSON 格式
    .then((data) => {
      console.log(data); // 打印响应数据到控制台

      // 更新页面上的天气信息
      cityElement.innerHTML = `🏙城市: ${data.showapi_res_body.cityInfo.c3}`;
      weatherElement.innerHTML = `🌤天气：${data.showapi_res_body.f1.day_weather}`;
      temperatureElement.innerHTML = `🌡气温：${data.showapi_res_body.f1.night_air_temperature}℃ ~ ${data.showapi_res_body.f1.day_air_temperature}℃`;
    })
    .catch((error) => console.error(error)); // 处理 API 请求错误
});
