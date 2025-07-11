import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Balance",
      value: "R$ 45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: FiDollarSign,
      color: "text-primary",
    },
    {
      title: "Active Wallets",
      value: "12",
      change: "+2",
      trend: "up",
      icon: FiUsers,
      color: "text-primary",
    },
    {
      title: "Monthly Growth",
      value: "R$ 2,340",
      change: "+15.3%",
      trend: "up",
      icon: FiTrendingUp,
      color: "text-primary",
    },
    {
      title: "Total Expenses",
      value: "R$ 12,234",
      change: "-8.2%",
      trend: "down",
      icon: FiTrendingDown,
      color: "text-red-500",
    },
  ];

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-app mb-2'>Dashboard</h1>
        <p className='text-secondary-500'>Visão geral das suas finanças</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div
            key={index}
            className='bg-card rounded-xl p-6 border border-secondary-200 shadow-sm'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-secondary-500 text-sm font-medium'>
                  {stat.title}
                </p>
                <p className='text-2xl font-bold text-app mt-1'>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-primary-50 ${stat.color}`}>
                <stat.icon className='w-6 h-6' />
              </div>
            </div>
            <div className='flex items-center mt-4'>
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-primary" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className='text-secondary-400 text-sm ml-2'>
                vs last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-card rounded-xl p-6 border border-secondary-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-app mb-4'>
            Recent Transactions
          </h3>
          <div className='space-y-4'>
            {[
              {
                name: "Bitcoin Purchase",
                amount: "+R$ 1,200",
                time: "2 hours ago",
                type: "buy",
              },
              {
                name: "Ethereum Sale",
                amount: "-R$ 800",
                time: "4 hours ago",
                type: "sell",
              },
              {
                name: "BNB Transfer",
                amount: "+R$ 450",
                time: "6 hours ago",
                type: "transfer",
              },
              {
                name: "ADA Purchase",
                amount: "+R$ 320",
                time: "8 hours ago",
                type: "buy",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-secondary-50 rounded-lg'
              >
                <div>
                  <p className='font-medium text-app'>{transaction.name}</p>
                  <p className='text-sm text-secondary-500'>
                    {transaction.time}
                  </p>
                </div>
                <div className='text-right'>
                  <p
                    className={`font-semibold ${
                      transaction.type === "buy" ||
                      transaction.type === "transfer"
                        ? "text-primary"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amount}
                  </p>
                  <span className='text-xs text-secondary-400 capitalize'>
                    {transaction.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-card rounded-xl p-6 border border-secondary-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-app mb-4'>Quick Actions</h3>
          <div className='grid grid-cols-2 gap-4'>
            {[
              {
                title: "Add Wallet",
                icon: "💼",
                color: "bg-primary text-white",
              },
              {
                title: "Send Money",
                icon: "📤",
                color: "bg-primary-100 text-primary",
              },
              {
                title: "Buy Crypto",
                icon: "💰",
                color: "bg-primary-100 text-primary",
              },
              {
                title: "View Reports",
                icon: "📊",
                color: "bg-secondary-100 text-secondary-600",
              },
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg border border-secondary-200 hover:shadow-md transition-all ${action.color}`}
              >
                <div className='text-2xl mb-2'>{action.icon}</div>
                <div className='text-sm font-medium'>{action.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
