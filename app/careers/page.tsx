export default function CareersPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-6">Careers at ERS</h1>

      <p className="text-gray-400 mb-6">
        ERS is building the infrastructure for on-demand services in Africa.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Why work with us</h2>
      <ul className="list-disc pl-6 text-gray-400 space-y-2">
        <li>Work on real-world problems</li>
        <li>Build products used daily</li>
        <li>Move fast and take ownership</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-4">Open roles</h2>
      <ul className="list-disc pl-6 text-gray-400 space-y-2">
        <li>Frontend Engineers</li>
        <li>Backend Engineers</li>
        <li>Designers</li>
        <li>Operations</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-4">Apply</h2>
      <p className="text-gray-400">
        Send your application to: <span className="text-white">careers@ers.com</span>
      </p>

    </main>
  );
}