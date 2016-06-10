// populates mongodb with Weather collection
import './weather/storeWeatherInfo.js';

// publish Weather record set
import '/imports/api/weather/server/publications.js';

// populates mongodb with Monitor collection
import './monitor/storeMonitorInfo.js';

// publish Kiosk record set
import '/imports/api/monitor/server/publications.js';