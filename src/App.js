import React from 'react';
import './App.css'; // Assuming styles are in an external CSS file
import Weather from './weather'; // Importing the Weather component

const App = () => {
  // Function to scroll to a widget
  const scrollToWidget = (event) => {
    const selectedWidget = event.target.value; // Get selected value
    const element = document.getElementById(selectedWidget); // Find the element by ID

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smooth scroll
    } else {
      console.error("Element not found for ID:", selectedWidget); // Log error
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header>
        <div className="logo">My Dashboard</div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </nav>
        {/* Dropdown for widget selection */}
        <select id="widget-select" onChange={scrollToWidget}>
          <option value="">Select a widget</option>
          <option value="weather">Weather</option>
          <option value="news">News Feed</option>
          <option value="scores">Sports Scores</option>
          <option value="stocks">Stocks/Financial Dashboard</option>
          <option value="currency">Currency Exchange Rates</option>
          <option value="social">Social Media Feed</option>
          <option value="traffic">Traffic Updates</option>
          <option value="alerts">Custom Alerts/Notifications</option>
          <option value="todo">To-Do List</option>
          <option value="calendar">Calendar</option>
          <option value="quotes">Motivational Quotes</option>
          <option value="fun-facts">Fun Facts</option>
        </select>
      </header>

      {/* Main Grid Layout */}
      <main className="grid-container">
        {/* News Feed */}
        <div id="news" className="news widget">News Feed</div>

        {/* Other Widgets */}
        <div className="other-widgets">
          <div id="weather" className="weather widget">
            <Weather /> {/* Including the Weather component here */}
          </div>
          <div id="scores" className="scores widget">Sports Scores</div>
          <div id="stocks" className="stocks widget">Stocks/Financial Dashboard</div>
          <div id="currency" className="currency widget">Currency Exchange Rates</div>
          <div id="social" className="social widget">Social Media Feed</div>
          <div id="traffic" className="traffic widget">Traffic Updates</div>
          <div id="alerts" className="alerts widget">Custom Alerts/Notifications</div>
          <div id="todo" className="todo widget">To-Do List</div>
          <div id="calendar" className="calendar widget">Calendar</div>
          <div id="quotes" className="quotes widget">Motivational Quotes</div>
          <div id="fun-facts" className="fun-facts widget">Fun Facts</div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2024 My Dashboard</p>
      </footer>
    </div>
  );
};

export default App;
