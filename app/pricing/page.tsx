export default function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-300">

      <h1 className="text-4xl font-bold text-white mb-6">
        Pricing
      </h1>

      <p className="mb-10">
        Transparent pricing based on your errand needs.
      </p>

      <h2 className="text-2xl font-semibold text-white mb-4">
        What affects pricing
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-10">
        <li>Distance</li>
        <li>Time required</li>
        <li>Task complexity</li>
        <li>Urgency</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">
        Payment model
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-10">
        <li>No upfront payment required</li>
        <li>Secure escrow or postpaid system</li>
        <li>Pay only after completion</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white mb-4">
        Platform fees
      </h2>
      <p>
        ERS charges a small service fee to maintain platform quality and reliability.
      </p>

    </main>
  );
}