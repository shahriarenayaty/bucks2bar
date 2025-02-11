document.addEventListener("DOMContentLoaded", function () {
  // input with id "username" on chages
  document.getElementById("username").addEventListener("input", function () {
    // get the value of the input
    const username = document.getElementById("username").value;
    // regex to chack if the username has at least 1 capital letter, 1 special character and 1 number and is at least 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    // check if the username matches the regex
    const isValid = regex.test(username);
    if (isValid) {
      // if the username is valid, set the border color to green
      document.getElementById("username").style.borderColor = "green";
    } else {
      // if the username is not valid, set the border color to red
      document.getElementById("username").style.borderColor = "red";
    }
  });

  const getMonthlyData = (month) => {
    const income = document.getElementById(`income-${month}`).value;
    const expenses = document.getElementById(`expenses-${month}`).value;
    return {
      income: parseFloat(income) || 0,
      expenses: parseFloat(expenses) || 0,
    };
  };

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

  months.forEach((month) => {
    const data = getMonthlyData(month);
    incomeData.push(data.income);
    expensesData.push(data.expenses);
  });

  const ctx = document.getElementById("myBarChart").getContext("2d");
  const myBarChart = new Chart(ctx, {
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

  const updateChart = () => {
    incomeData.length = 0;
    expensesData.length = 0;

    months.forEach((month) => {
      const data = getMonthlyData(month);
      incomeData.push(data.income);
      expensesData.push(data.expenses);
    });

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
});
