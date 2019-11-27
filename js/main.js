$(function () {
  /* */
  $('#transaction-form').submit((event) => {
    event.preventDefault()

    // reading value from text field
    const amount = parseFloat($('#transaction-amount').val())
    console.log(amount)

    // reading value from select dropdown
    const transactionType = $('#transaction-type').val()
    console.log(transactionType)

    processTransaction(transactionType, amount)
    displayBalance()
    displayTransactionHistory()
    clearAmountField()
  })

  function displayBalance () {
    $('.bank-balance').text(bankAccount.showBalance())
  }

  function clearAmountField () {
    $('#transaction-amount').val('')
  }

  function processTransaction (transactionType, amount) {
    if (transactionType === 'deposit') {
      /* OOP logic */
      bankAccount.deposit(amount)
    } else {
      // transactionType === withdrawal

      /* OOP logic */
      bankAccount.withdraw(amount)
    }

    console.log(bankAccount.transactionHistory)
  }

  function displayTransactionHistory () {
    // clear all <li>s
    $('#transaction-list').html('')

    /* OOP logic */
    const transactionItems = bankAccount.transactionHistory.map((transaction) => {
      return (transactionItemHtml(transaction.transactionType, transaction.transactionAmount, transaction.newBalance))
    })

    console.log(transactionItems)

    $('#transaction-list').append(transactionItems)
  }

  function transactionItemHtml (transType, transAmount, newBalance) {
    return (
      `<li>
        <span class="new-transaction-type">${transType}</span>
        <span>for</span>
        <span class="new-transaction-amount">${transAmount}<span> |
        <span>New Balance:</span> <span class="new-bank-balance">${newBalance}<span>
      </li>`
    )
  }

  class BankAccount {
    constructor (accountType, amount) {
      this._accountType = accountType
      this._amount = amount
      this._transactionHistory = []
    }

    withdraw (withdrawlAmount) {
      // after this transaction, update the transaction history
      const oldBalance = this._amount

      this._amount = this._amount - withdrawlAmount

      this._transactionHistory.push({
        oldBalance: oldBalance,
        transactionType: 'withdrawl',
        transactionAmount: withdrawlAmount,
        newBalance: this._amount
      })
    }

    deposit (depositAmount) {
      // after this transaction, update the transaction history
      const oldBalance = this._amount

      this._amount = this._amount + depositAmount

      this._transactionHistory.push({
        oldBalance: oldBalance,
        transactionType: 'deposit',
        transactionAmount: depositAmount,
        newBalance: this._amount
      })
    }

    showBalance () {
      return this._amount
    }

    get transactionHistory () {
      return this._transactionHistory
    }
  }

  // create instance of BankAcount class in Global scope
  const bankAccount = new BankAccount('checking', 1000)
  displayBalance()

  /* Testing OOP logic */

  // console.log(bankAccount)
  // bankAccount.withdraw(50)
  // bankAccount.deposit(200)
  // bankAccount.withdraw(100)
  // bankAccount.withdraw(75)
  // bankAccount.deposit(100)
  // console.log(bankAccount)
  // console.log(bankAccount)
  // console.log(bankAccount.showBalance())
  // console.log(bankAccount.transactionHistory)
})
