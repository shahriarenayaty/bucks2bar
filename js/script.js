document.addEventListener("DOMContentLoaded", function () {
  // Fetch dummy data and update input fields
  fetch("http://localhost:3000/dummy-data")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(month => {
        const incomeInput = document.getElementById(`income-${month}`);
        const expensesInput = document.getElementById(`expenses-${month}`);
        if (incomeInput && expensesInput) {
          incomeInput.value = data[month].income;
          expensesInput.value = data[month].expenses;
        }
      });
      // Optionally update the chart if already initialized
      if (typeof updateChart === "function") updateChart();
    })
    .catch(err => console.error("Error fetching dummy data:", err));

  document
    .getElementById("username")
    .addEventListener("input", userInputCallback);

  /**
   * Callback function to validate the user input for a username.
   * 
   * This function retrieves the value of the input field with the ID "username",
   * checks if it matches the specified regex pattern (at least 1 capital letter,
   * 1 special character, 1 number, and at least 8 characters long), and sets the
   * border color of the input field to green if valid, or red if invalid.
   */
  function userInputCallback() {
    const username = document.getElementById("username").value;
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const isValid = regex.test(username);
    if (isValid) {
      document.getElementById("username").style.borderColor = "green";
    } else {
      document.getElementById("username").style.borderColor = "red";
    }
  }

  document.getElementById("send-email").addEventListener("click", function () {
    var canvas = document.getElementById("myBarChart");
    var image = canvas.toDataURL("image/png");
    sendEmail(image);
  });
  const getMonthlyData = (month) => {
    const income = document.getElementById(`income-${month}`).value;
    const expenses = document.getElementById(`expenses-${month}`).value;
    return {
      income: parseFloat(income) || 0,
      expenses: parseFloat(expenses) || 0,
    };
  };
  function sendEmail(image) {
    const email = document.getElementById("email-address").value;
    if (!email) return;

    fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, image: image }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Email sent successfully!");
        } else {
          alert("Failed to send email.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while sending the email.");
      });
  }

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const incomeData = [];
  const expensesData = [];

  const populateDataArrays = () => {
    incomeData.length = 0;
    expensesData.length = 0;

    months.forEach((month) => {
      const data = getMonthlyData(month);
      incomeData.push(data.income);
      expensesData.push(data.expenses);
    });
  };

  let myBarChart;

  const initializeChart = () => {
    const ctx = document.getElementById("myBarChart").getContext("2d");
    myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Income",
            data: incomeData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Expenses",
            data: expensesData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const updateChart = () => {
    populateDataArrays();
    myBarChart.update();
  };

  months.forEach((month) => {
    document
      .getElementById(`income-${month}`)
      .addEventListener("input", updateChart);
    document
      .getElementById(`expenses-${month}`)
      .addEventListener("input", updateChart);
  });

  document.getElementById("download").addEventListener("click", function () {
    var canvas = document.getElementById("myBarChart");
    var image = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.href = image;
    link.download = "chart.png";
    link.click();
  });

  document
    .getElementById("chart-tab")
    .addEventListener("shown.bs.tab", function () {
      if (!myBarChart) {
        populateDataArrays();
        initializeChart();
      }
    });
});
