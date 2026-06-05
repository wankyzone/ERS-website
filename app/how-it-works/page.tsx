export default function HowItWorksPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-300">

      <h1 className="text-4xl font-bold text-white mb-6">
        How ERS Works
      </h1>

      <p className="mb-10">
        Get your errands done quickly and efficiently in just a few steps.
      </p>

      {/* Steps */}
      <div className="space-y-10">

        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            1. Create an errand
          </h2>
          <p>
            Tell us what you need done. Add details, location, and any instructions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            2. Get matched instantly
          </h2>
          <p>
            Nearby runners receive your request and accept within seconds.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            3. Track in real-time
          </h2>
          <p>
            Follow your errand live with updates and notifications.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            4. Task completed
          </h2>
          <p>
            Confirm completion and finalize payment once the job is done.
          </p>
        </div>

      </div>

    </main>
  );
}