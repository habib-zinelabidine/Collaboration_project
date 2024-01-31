import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSpinner({circle,className }) {
  return (
    <SkeletonTheme
      baseColor="var(--message-background-color)"
      highlightColor="#444"
    >
      <Skeleton circle={circle} className={className}/>
    </SkeletonTheme>
  );
}
