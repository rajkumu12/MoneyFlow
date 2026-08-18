import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { Transaction } from "../../types/transaction";

import {
  createChartData,
  type ChartPeriod,
} from "./chartUtils";

interface IncomeExpenseChartProps {
  transactions: Transaction[];
  period: ChartPeriod;
}

function IncomeExpenseChart({
  transactions,
  period,
}: IncomeExpenseChartProps) {
  const data = createChartData(
    transactions,
    period,
  );

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="financial-chart">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
          margin={{
            top: 12,
            right: 8,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="incomeGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563eb"
                stopOpacity={0.22}
              />

              <stop
                offset="100%"
                stopColor="#2563eb"
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient
              id="expenseGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#ef4444"
                stopOpacity={0.16}
              />

              <stop
                offset="100%"
                stopColor="#ef4444"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#eef0f4"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            width={55}
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            tickFormatter={(value) =>
              value >= 1000
                ? `₹${value / 1000}k`
                : `₹${value}`
            }
          />

          <Tooltip
            cursor={{
              stroke: "#d1d5db",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              background: "#ffffff",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.08)",
              padding: "12px 14px",
            }}
            formatter={(value, name) => [
              formatAmount(Number(value)),
              name === "income"
                ? "Income"
                : "Expenses",
            ]}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#incomeGradient)"
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#ffffff",
            }}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2.5}
            fill="url(#expenseGradient)"
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: "#ffffff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;