import { useAuth } from '../contexts/AuthContext';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    features: [
      'Limited video streaming (SD)',
      'Limited music streaming',
      'Ads included',
      'Basic recommendations',
      '1 device at a time',
    ],
    buttonText: 'Current Plan',
    buttonVariant: 'bg-gray-700 cursor-not-allowed',
    popular: false,
  },
  {
    name: 'Standard',
    price: '$9.99',
    period: '/month',
    features: [
      'Full HD video streaming',
      'Unlimited music streaming',
      'Ad-free experience',
      'Offline downloads',
      '2 devices at a time',
      'Personalized recommendations',
    ],
    buttonText: 'Choose Standard',
    buttonVariant: 'bg-red-600 hover:bg-red-700',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$15.99',
    period: '/month',
    features: [
      '4K + HDR video streaming',
      'Hi-Fi lossless music',
      'Ad-free + exclusive content',
      'Unlimited offline downloads',
      '6 devices at a time',
      'Family profiles & controls',
      'Early access to new releases',
    ],
    buttonText: 'Choose Premium',
    buttonVariant: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    popular: true,
  },
];

const Subscription = () => {
  const { user } = useAuth(); // For future: show current plan

  const handleSubscribe = (planName) => {
    alert(`You selected the ${planName} plan! (Payment integration coming soon)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-20 px-6">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-12">
          Unlimited videos and music. No contracts. Cancel anytime.
        </p>
        <div className="flex justify-center gap-8 text-lg text-gray-400">
          <div className="flex items-center gap-3">
            <span className="text-3xl">✔</span>
            <span>Watch anywhere</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">✔</span>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">✔</span>
            <span>One price for all content</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-10 border ${
                plan.popular
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/20 transform scale-105'
                  : 'border-gray-700'
              } transition-all duration-300 hover:border-purple-500/50`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-bold px-6 py-2 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold">{plan.price}</span>
                  <span className="text-xl text-gray-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-5 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-green-400 text-2xl mt-0.5">✔</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-5 rounded-full text-xl font-bold transform hover:scale-105 transition shadow-lg ${plan.buttonVariant}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <section className="text-center mt-20 text-gray-500">
        <p>Prices include all taxes. Billed monthly. Free plan includes ads and limits.</p>
        <p className="mt-4">
          Already subscribed?{' '}
          <a href="/login" className="text-red-400 hover:text-red-300 underline">
            Manage your plan
          </a>
        </p>
      </section>
    </div>
  );
};

export default Subscription;