import { Recommendation } from '@/types';

const RecommendationsComponent = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  const validateRecommendations = (recs: Recommendation[]) => {
    try {
      recs.forEach(({ label, colorCode }) => {
        if (!label || !colorCode) {
          throw new Error('Missing label or colorCode');
        }

        // Optional: Validate colorCode format (simple hex color regex)
        const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
        if (!colorRegex.test(colorCode)) {
          throw new Error(`Invalid colorCode: ${colorCode}`);
        }
      });
    } catch {
      return false;
    }
    return true;
  };

  if (!validateRecommendations(recommendations)) {
    return;
  }

  return (
    recommendations.length > 0 &&
    recommendations.map(({ label, colorCode }, index) => (
      <div
        className='flex items-center border-dashed border border-[#DFE1E4] rounded-lg px-2.5 py-[5px] text-[12px] font-normal leading-[20px] tracking-[0.2px] text-left'
        key={index}
      >
        <span
          className='inline-block w-3 h-3 rounded-full mr-2'
          style={{ backgroundColor: colorCode }}
        ></span>
        {label}
      </div>
    ))
  );
};

export default RecommendationsComponent;
