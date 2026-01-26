import { 
    useEffect, 
    useState 
} from "react";

import Filter from "../Header/Filter"; 
import FilterAside from "./FilterAside";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardCnt = ({
        cards,
        applyFilter,
        ChangeCampus,
        ChangeCondition,
        ChangePrice,
        ChangeCategory,
        ChangeState,
        ChangeSubCategory,
        category,
        state,
        updateLimit,
        rowIndex = 0  // Which row to display (0 = first row, 1 = second row, etc.)
    }) => {
   
        let [screenWidth, setScreenWidth] = useState(0)
        let [cardsSet, setcardsSet] = useState([])
        let [limit, setLimit] = useState(5)
   
        useEffect(() => {
          setScreenWidth(window.innerWidth)
        }, [])
    
        useEffect(() => {
            let currentLimit = 5
            // Determine limit based on screen width
            if (screenWidth < 480) {
                currentLimit = 2 * 5
            } else if (screenWidth > 480 && screenWidth < 1000) {
                currentLimit = 3 * 5
            } else if (screenWidth >= 1000) {
                currentLimit = 5 * 5
            }
            
            setLimit(currentLimit)
            updateLimit(currentLimit)
            
            if (cards.length > 0) {
                // Slice cards based on rowIndex
                const startIndex = rowIndex * currentLimit
                const endIndex = startIndex + currentLimit
                setcardsSet(cards.slice(startIndex, endIndex))
            }
        }, [cards, screenWidth, rowIndex])

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="cols">
            <div className="card shadow-md" style={{height: '350px', marginBottom: '10px', borderRadius: '4px', position: 'relative', display: 'flex', padding: '5px'}}>
                {/* Image skeleton */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    width: '100%',
                    left: '0',
                    height: '180px'
                }}>
                    <Skeleton height={180} style={{borderRadius: '4px'}} />
                </div>

                {/* Content skeleton */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    left: '0',
                    flexDirection: 'column',
                }}>
                    <div className="card-body" style={{position: 'relative', margin: '0px', padding: "0px 10px"}}>
                        {/* Title skeleton */}
                        <Skeleton height={18} width="80%" style={{marginBottom: '8px'}} />
                        
                        {/* Price skeleton */}
                        <Skeleton height={24} width="60%" style={{marginBottom: '10px', marginTop: '10px'}} />
                        
                        {/* Condition skeleton (optional) */}
                        <Skeleton height={20} width="40%" style={{marginBottom: '8px'}} />
                    </div>
                    
                    {/* Location skeleton */}
                    <div style={{padding: '0 5px', marginBottom: '5px'}}>
                        <Skeleton height={15} width="50%" />
                    </div>
                    
                    {/* Views and time skeleton */}
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 5px', alignItems: 'center'}}>
                        <Skeleton height={15} width="30%" />
                        <Skeleton height={15} width="30%" />
                    </div>
                </div>
            </div>
        </div>
    )
    
    return ( 
        <>
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#ffffff">
                <div className="buyer-card-cnt" style={{
                    borderRadius: '1.5px',
                    height: '100%', 
                    minHeight: 'unset',
                    padding: '0',
                    background: '#fff',
                }}>
                    {cards.length === 0 ? (
                        // Show loading skeletons when no cards - use limit to determine count
                        Array.from({ length: limit || 5 }).map((_, index) => (
                            <LoadingSkeleton key={index} />
                        ))
                    ) : (
                        // Show actual cards
                        cardsSet.map((item, index) => item)
                    )}
                </div>
            </SkeletonTheme>
        </>
     );
}
 
export default CardCnt;