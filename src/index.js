let city = "";
let apiKey = "8b1a1ta30dba43658ff8edf2ddfbo830";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

axios.get(apiUrl).then(search);
