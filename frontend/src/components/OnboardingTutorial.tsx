import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface TutorialStep {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  buttonText: string;
  buttonColor: string;
}

interface OnboardingTutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip: () => void;
  storageKey: string;
}

const OnboardingTutorial = ({ steps, onComplete, onSkip, storageKey }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if user has already seen the tutorial
    const hasSeenTutorial = localStorage.getItem(storageKey);
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [storageKey]);


  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem(storageKey, 'true');
    setShowTutorial(false);
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem(storageKey, 'true');
    setShowTutorial(false);
    onSkip();
  };

  if (!showTutorial) return null;

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[1000] transition-opacity duration-300" />

      {/* Tutorial Modal */}
      <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
        <div className="relative max-w-sm w-full">
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
            {/* Header with time */}
            <div className="px-6 pt-6 pb-4">
              <div className="text-center text-sm font-medium text-gray-900 mb-8">
                {currentStepData.title}
              </div>

              {/* Illustration Card */}
              <div className="relative mb-6">
                {/* Gradient Background Blob */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-cyan-100 via-blue-50 to-purple-100 rounded-full blur-3xl opacity-60"></div>
                </div>

                {/* Content Card */}
                <div className="relative bg-white rounded-2xl shadow-lg p-6 mx-4">
                  {/* Image Placeholder */}
                  {currentStepData.image ? (
                    <img src={currentStepData.image} alt={currentStepData.title} className="w-full h-32 object-contain mb-4" />
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image Placeholder</span>
                    </div>
                  )}

                  {/* Subtitle */}
                  <div className="text-xs text-gray-500 mb-1">{currentStepData.subtitle}</div>
                  
                  {/* Action Button in Card */}
                  <button
                    className={`w-full py-2 rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 ${currentStepData.buttonColor}`}
                  >
                    {currentStepData.buttonText}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="px-6 pb-8">
              {/* Main Title */}
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                {currentStepData.title}
              </h2>

              {/* Description */}
              <p className="text-center text-gray-600 text-sm mb-6 leading-relaxed">
                {currentStepData.description}
              </p>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-8 bg-gray-900'
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </button>

              {/* Skip Link */}
              <button
                onClick={handleSkip}
                className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip Tutorial
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTutorial;
