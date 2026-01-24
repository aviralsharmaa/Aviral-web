"use client";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Experience</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Machine Learning Engineer @ OneARVO Ventures
            </h3>
            <p className="text-white/80 mb-2">
              OneARVO Ventures, Noida, IN
            </p>
            <p className="text-white/60 text-sm mb-3">
              Dec 2024 - Present
            </p>
            <ul className="space-y-2 text-white/80 leading-relaxed">
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Worked on large-scale anti-counterfeiting and authentication systems using computer vision and deep learning, developing Vision Transformer and contrastive learning models trained on 200K+ images for QR code and copy-detection pattern verification.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Built autonomous computer-vision agents for QR and CDP-based product authentication, achieving 97.9% verification accuracy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Designed automated data preparation, curation, and perception pipelines to detect, crop, and augment QR regions for large-scale training on AWS SageMaker.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Architected end-to-end ML pipelines with distributed training, hyperparameter tuning, and experiment tracking using SageMaker, MLflow, and Airflow.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Built automated training, evaluation, and deployment pipelines using AWS SageMaker, MLflow, Airflow, and Docker.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Designed real-time inference services with experiment tracking, model versioning, and monitoring workflows, reducing average prediction latency by 65% and enabling scalable, fault-tolerant serving.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Implemented MLOps and observability workflows with CI/CD, model versioning, drift monitoring, and feedback loops using GitHub Actions, helping achieve high accuracy, low latency, and reliable production deployment.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Flutter Developer @ BlueTrans
            </h3>
            <p className="text-white/80 mb-2">
              Noida, Uttar Pradesh, India
            </p>
            <p className="text-white/60 text-sm mb-3">
              Full-time: Aug 2024 - Nov 2024 • Internship: May 2024 - Jul 2024
            </p>
            <ul className="space-y-2 text-white/80 leading-relaxed">
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Integrated Razorpay payment gateway into an Android application to enable seamless and secure transactions, improving user experience and potentially increasing successful payments by 70%.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Designed app UI, enhancing user experience and engagement.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Implemented authentication, improving security and reducing unauthorized access.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Increased app speeds by 30%, resulting in a smoother user experience for 400 daily active users.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

