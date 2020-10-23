const validatePIN = () => {
  let input = document.getElementById("pinNumber").value;

  return new Promise((resolve, reject) => {
    if (!input) {
      return reject({
        success: false,
        message: "PIN Cannot be Empty!",
      });
    }

    if (input === "123456") {
      return resolve({
        success: true,
        message: "Correct PIN!",
        data: {
          name: "Jolyne Cujoh",
          balance: 1000000,
        },
      });
    } else {
      return reject({
        success: false,
        message: "Incorrect PIN, no user found!",
      });
    }
  });
};

const withDrawMoney = (amount, balance) => {
  return new Promise((resolve, reject) => {
    if (amount > balance) {
      return reject({
        success: false,
        message: "Insufficient Balance",
      });
    } else {
      return resolve({
        success: true,
        message: "Money Withdrawed!",
        data: {
          name: "Jolyne Cujoh",
          balance: balance - amount,
        },
      });
    }
  });
};

const formElement = document.querySelector("#login");

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    let withdrawAmount = document.getElementById("withdraw").value;

    const validateResponse = await validatePIN();
    const withdrawed = await withDrawMoney(
      withdrawAmount,
      validateResponse.data.balance
    );

    let accountInfo = document.getElementById("account-info");
    accountInfo.innerHTML = `
          <div>Account Name: <strong> ${validateResponse.data.name} </strong> </div>
          <div>Balance: <strong>Rp${validateResponse.data.balance} </strong> </div>
          <br/>
        `;

    let accountInfo2 = document.getElementById("account-info2");
    accountInfo2.innerHTML = `
          <div>Account Name: <strong> ${withdrawed.data.name} </strong> </div>
          <div>Balance: <strong>Rp${withdrawed.data.balance} </strong> </div>
          <br/>
        `;
  } catch (error) {
    alert(error.message);
  }

});
