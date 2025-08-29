'use client'

import { useState } from 'react'
import { Calculator, DollarSign, TrendingUp, PiggyBank, CreditCard, Building } from 'lucide-react'

interface CalculatorProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function CalculatorCard({ title, icon, children }: CalculatorProps) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

interface InputFieldProps {
  label: string
  value: number | string
  onChange: (value: number) => void
  type?: 'currency' | 'percentage' | 'number'
  placeholder?: string
}

function InputField({ label, value, onChange, type = 'number', placeholder }: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) || 0
    onChange(val)
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {type === 'currency' && (
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <input
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
            type === 'currency' ? 'pl-10' : ''
          }`}
        />
        {type === 'percentage' && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
        )}
      </div>
    </div>
  )
}

function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000)
  const [finalValue, setFinalValue] = useState<number>(15000)
  const [timeYears, setTimeYears] = useState<number>(2)

  const roi = ((finalValue - initialInvestment) / initialInvestment) * 100
  const annualizedROI = ((Math.pow(finalValue / initialInvestment, 1 / timeYears) - 1) * 100)

  return (
    <CalculatorCard
      title="ROI Calculator"
      icon={<TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField
            label="Initial Investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            type="currency"
            placeholder="10000"
          />
          <InputField
            label="Final Value"
            value={finalValue}
            onChange={setFinalValue}
            type="currency"
            placeholder="15000"
          />
          <InputField
            label="Time Period (Years)"
            value={timeYears}
            onChange={setTimeYears}
            placeholder="2"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Results</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total ROI:</span>
              <span className={`font-semibold ${roi >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {roi.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Annualized ROI:</span>
              <span className={`font-semibold ${annualizedROI >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {annualizedROI.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-600 dark:text-gray-400">Profit/Loss:</span>
              <span className={`font-semibold ${(finalValue - initialInvestment) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                ${(finalValue - initialInvestment).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  )
}

function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<number>(10000)
  const [pricePerUnit, setPricePerUnit] = useState<number>(100)
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(60)

  const contributionMargin = pricePerUnit - variableCostPerUnit
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0
  const breakEvenRevenue = breakEvenUnits * pricePerUnit

  return (
    <CalculatorCard
      title="Break-Even Analysis"
      icon={<Building className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField
            label="Fixed Costs (Monthly)"
            value={fixedCosts}
            onChange={setFixedCosts}
            type="currency"
            placeholder="10000"
          />
          <InputField
            label="Price per Unit"
            value={pricePerUnit}
            onChange={setPricePerUnit}
            type="currency"
            placeholder="100"
          />
          <InputField
            label="Variable Cost per Unit"
            value={variableCostPerUnit}
            onChange={setVariableCostPerUnit}
            type="currency"
            placeholder="60"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Results</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Contribution Margin:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${contributionMargin.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Break-Even Units:</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {breakEvenUnits.toLocaleString()} units
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-600 dark:text-gray-400">Break-Even Revenue:</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                ${breakEvenRevenue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  )
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<number>(1000)
  const [annualRate, setAnnualRate] = useState<number>(7)
  const [years, setYears] = useState<number>(10)
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12)

  const amount = principal * Math.pow((1 + (annualRate / 100) / compoundingFrequency), compoundingFrequency * years)
  const interestEarned = amount - principal

  return (
    <CalculatorCard
      title="Compound Interest Calculator"
      icon={<PiggyBank className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            type="currency"
            placeholder="1000"
          />
          <InputField
            label="Annual Interest Rate"
            value={annualRate}
            onChange={setAnnualRate}
            type="percentage"
            placeholder="7"
          />
          <InputField
            label="Time Period (Years)"
            value={years}
            onChange={setYears}
            placeholder="10"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Compounding Frequency
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={1}>Annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
              <option value={365}>Daily</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Results</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Final Amount:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                ${amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Interest Earned:</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                ${interestEarned.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-600 dark:text-gray-400">Total Return:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {((interestEarned / principal) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  )
}

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(200000)
  const [interestRate, setInterestRate] = useState<number>(4.5)
  const [loanTerm, setLoanTerm] = useState<number>(30)

  const monthlyRate = (interestRate / 100) / 12
  const totalPayments = loanTerm * 12
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
  const totalPayment = monthlyPayment * totalPayments
  const totalInterest = totalPayment - loanAmount

  return (
    <CalculatorCard
      title="Loan Payment Calculator"
      icon={<CreditCard className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            type="currency"
            placeholder="200000"
          />
          <InputField
            label="Annual Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            type="percentage"
            placeholder="4.5"
          />
          <InputField
            label="Loan Term (Years)"
            value={loanTerm}
            onChange={setLoanTerm}
            placeholder="30"
          />
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Results</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Monthly Payment:</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                ${monthlyPayment.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Payment:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${totalPayment.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-600 dark:text-gray-400">Total Interest:</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                ${totalInterest.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  )
}

export default function FinancialCalculators() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Interactive Financial Calculators</h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Practice your financial knowledge with these interactive tools
        </p>
      </div>

      <div className="grid gap-8">
        <ROICalculator />
        <BreakEvenCalculator />
        <CompoundInterestCalculator />
        <LoanCalculator />
      </div>

      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Learning Tip
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            Try adjusting different values in these calculators to understand how various factors affect financial outcomes. 
            These tools are commonly used in business decision-making and investment analysis.
          </p>
        </div>
      </div>
    </div>
  )
}