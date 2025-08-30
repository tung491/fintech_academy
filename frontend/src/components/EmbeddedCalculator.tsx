'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Target } from 'lucide-react'

interface CashFlowWeek {
  week: number
  opening: number
  inflows: number
  outflows: number
  closing: number
}

interface EmbeddedCalculatorProps {
  type: 'cash-flow' | 'roi' | 'working-capital' | 'break-even'
  title?: string
  description?: string
}

export function EmbeddedCalculator({ type, title, description }: EmbeddedCalculatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getCalculatorIcon = () => {
    switch (type) {
      case 'cash-flow': return <TrendingUp className="w-5 h-5" />
      case 'roi': return <DollarSign className="w-5 h-5" />
      case 'working-capital': return <Calculator className="w-5 h-5" />
      case 'break-even': return <Target className="w-5 h-5" />
      default: return <Calculator className="w-5 h-5" />
    }
  }

  const getDefaultTitle = () => {
    switch (type) {
      case 'cash-flow': return 'Cash Flow Forecasting Calculator'
      case 'roi': return 'ROI Calculator'
      case 'working-capital': return 'Working Capital Calculator'
      case 'break-even': return 'Break-Even Analysis Calculator'
      default: return 'Financial Calculator'
    }
  }

  const renderCalculator = () => {
    switch (type) {
      case 'cash-flow': return <CashFlowCalculator />
      case 'roi': return <ROICalculator />
      case 'working-capital': return <WorkingCapitalCalculator />
      case 'break-even': return <BreakEvenCalculator />
      default: return <div className="p-4 text-center text-gray-600">Calculator not implemented</div>
    }
  }

  return (
    <div className="my-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-blue-100/50 dark:hover:bg-blue-800/30 rounded-t-lg transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
            {getCalculatorIcon()}
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {title || getDefaultTitle()}
            </h4>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t border-blue-200 dark:border-blue-800">
          {renderCalculator()}
        </div>
      )}
    </div>
  )
}

function CashFlowCalculator() {
  const [weeks, setWeeks] = useState<CashFlowWeek[]>([
    { week: 1, opening: 15000, inflows: 8000, outflows: 6500, closing: 0 },
    { week: 2, opening: 0, inflows: 12000, outflows: 4200, closing: 0 },
    { week: 3, opening: 0, inflows: 5000, outflows: 7000, closing: 0 },
    { week: 4, opening: 0, inflows: 15000, outflows: 8500, closing: 0 }
  ])

  const updateWeek = (index: number, field: keyof CashFlowWeek, value: number) => {
    const newWeeks = [...weeks]
    newWeeks[index] = { ...newWeeks[index], [field]: value }
    
    // Recalculate closing balances and subsequent opening balances
    for (let i = 0; i < newWeeks.length; i++) {
      const week = newWeeks[i]
      week.closing = week.opening + week.inflows - week.outflows
      
      // Set next week's opening balance
      if (i + 1 < newWeeks.length) {
        newWeeks[i + 1].opening = week.closing
      }
    }
    
    setWeeks(newWeeks)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Plan your cash flow over 4 weeks. Enter your expected opening balance, inflows, and outflows to see your projected cash position.
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Week
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Opening
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Inflows
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Outflows
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Closing
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {weeks.map((week, index) => (
              <tr key={week.week} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  Week {week.week}
                </td>
                <td className="px-4 py-4">
                  {index === 0 ? (
                    <input
                      type="number"
                      value={week.opening}
                      onChange={(e) => updateWeek(index, 'opening', Number(e.target.value))}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(week.opening)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    value={week.inflows}
                    onChange={(e) => updateWeek(index, 'inflows', Number(e.target.value))}
                    className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    value={week.outflows}
                    onChange={(e) => updateWeek(index, 'outflows', Number(e.target.value))}
                    className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </td>
                <td className="px-4 py-4">
                  <span className={`text-sm font-medium ${
                    week.closing >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(week.closing)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Net Change:
          </span>
          <span className={`text-sm font-bold ${
            (weeks[weeks.length - 1]?.closing || 0) - weeks[0].opening >= 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {formatCurrency((weeks[weeks.length - 1]?.closing || 0) - weeks[0].opening)}
          </span>
        </div>
      </div>
    </div>
  )
}

function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [finalValue, setFinalValue] = useState(12500)
  const [timeMonths, setTimeMonths] = useState(12)

  const roi = ((finalValue - initialInvestment) / initialInvestment) * 100
  const annualizedROI = ((Math.pow(finalValue / initialInvestment, 12 / timeMonths) - 1) * 100)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Initial Investment
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Final Value
          </label>
          <input
            type="number"
            value={finalValue}
            onChange={(e) => setFinalValue(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time Period (Months)
          </label>
          <input
            type="number"
            value={timeMonths}
            onChange={(e) => setTimeMonths(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <div className="text-lg font-bold text-green-800 dark:text-green-400">
            {roi.toFixed(2)}%
          </div>
          <div className="text-sm text-green-600 dark:text-green-500">Total ROI</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="text-lg font-bold text-blue-800 dark:text-blue-400">
            {annualizedROI.toFixed(2)}%
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-500">Annualized ROI</div>
        </div>
      </div>
    </div>
  )
}

function WorkingCapitalCalculator() {
  const [currentAssets, setCurrentAssets] = useState(50000)
  const [currentLiabilities, setCurrentLiabilities] = useState(20000)

  const workingCapital = currentAssets - currentLiabilities
  const currentRatio = currentAssets / currentLiabilities
  const quickRatio = (currentAssets * 0.8) / currentLiabilities // Assuming 80% are liquid assets

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Assets ($)
          </label>
          <input
            type="number"
            value={currentAssets}
            onChange={(e) => setCurrentAssets(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="text-xs text-gray-500 mt-1">Cash, receivables, inventory</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Liabilities ($)
          </label>
          <input
            type="number"
            value={currentLiabilities}
            onChange={(e) => setCurrentLiabilities(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="text-xs text-gray-500 mt-1">Payables, short-term debt</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <div className="text-lg font-bold text-purple-800 dark:text-purple-400">
            ${workingCapital.toLocaleString()}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-500">Working Capital</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <div className="text-lg font-bold text-green-800 dark:text-green-400">
            {currentRatio.toFixed(2)}
          </div>
          <div className="text-sm text-green-600 dark:text-green-500">Current Ratio</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="text-lg font-bold text-blue-800 dark:text-blue-400">
            {quickRatio.toFixed(2)}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-500">Quick Ratio</div>
        </div>
      </div>
    </div>
  )
}

function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(10000)
  const [pricePerUnit, setPricePerUnit] = useState(100)
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(40)

  const contributionMargin = pricePerUnit - variableCostPerUnit
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin)
  const breakEvenRevenue = breakEvenUnits * pricePerUnit

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fixed Costs ($)
          </label>
          <input
            type="number"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price per Unit ($)
          </label>
          <input
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Variable Cost per Unit ($)
          </label>
          <input
            type="number"
            value={variableCostPerUnit}
            onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
          <div className="text-lg font-bold text-orange-800 dark:text-orange-400">
            {breakEvenUnits.toLocaleString()}
          </div>
          <div className="text-sm text-orange-600 dark:text-orange-500">Break-Even Units</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <div className="text-lg font-bold text-green-800 dark:text-green-400">
            ${breakEvenRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-green-600 dark:text-green-500">Break-Even Revenue</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="text-lg font-bold text-blue-800 dark:text-blue-400">
            ${contributionMargin.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-500">Contribution Margin</div>
        </div>
      </div>
    </div>
  )
}