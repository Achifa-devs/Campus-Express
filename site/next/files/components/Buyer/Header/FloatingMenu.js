import { useEffect, useRef } from 'react';
import { usePathname } from "next/navigation";
import { FiChevronRight } from 'react-icons/fi';
import styles from './FloatingMenu.module.css';

const FloatingMenu = ({ list, right, top, visible, getSelectedOption, setDisplay }) => {
    const pathname = usePathname();
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setDisplay('none');
            }
        };

        if (visible === 'flex') {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible, setDisplay]);

    const handleItemClick = (item) => {
        const url = getSelectedOption === 'categories' 
            ? `/store/category/${encodeURIComponent(item.txt)}` 
            : `/store/${item.uri}`;
        window.location.href = url;
        setDisplay('none');
    };

    return (
        <div 
            ref={menuRef}
            className={`${styles.floatingMenu} ${visible === 'flex' ? styles.visible : ''}`}
            style={{
                left: `${right - 90}px`,
                top: `${top + 50}px`,
                height: getSelectedOption === 'categories' ? '70vh' : 'auto',
                width: getSelectedOption === 'categories' ? '320px' : '240px'
            }}
        >
            <ul className={styles.menuList}>
                {list.map((item, index) => (
                    <div key={index}>
                        {index === list.length - 1 && getSelectedOption !== 'categories' && (
                            <div className={styles.divider} />
                        )}
                        
                        <li 
                            className={`${styles.menuItem} ${index === list.length - 1 && getSelectedOption !== 'categories' ? styles.lastItem : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className={styles.itemContent}>
                                {item.icon ? (
                                    <span className={styles.icon}>{item.icon}</span>
                                ) : (
                                    <img 
                                        src={item.svg?.src} 
                                        className={styles.iconImage} 
                                        alt={item.txt} 
                                        width={20}
                                        height={20}
                                    />
                                )}
                                <span className={styles.itemText}>{item.txt}</span>
                                <FiChevronRight className={styles.arrowIcon} />
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default FloatingMenu;