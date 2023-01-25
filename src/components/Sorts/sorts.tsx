import React, {useEffect, useRef, useState} from 'react';
import { FilerObj } from '../../@types/types';

export const sorts: FilerObj[] = [
  {name: 'rating', type: 'desc'},
  {name: 'rating', type: 'asc'},
  {name: 'price', type: 'desc'},
  {name: 'price', type: 'asc'},
  {name: 'name', type: 'desc'},
  {name: 'name', type: 'asc'}
];

type SortProps = {
  chooseASort: (sort: FilerObj) => void,
  activSort: FilerObj
}

const Sorts: React.FC<SortProps> = ({chooseASort, activSort}) => {

  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const hidePopap = (sort: FilerObj) => {
    console.log(sort);
    chooseASort(sort);
    setVisiblePopup(false);
  };

  useEffect(() => {
    const outsidePopupClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)
        if(!target.closest('.sort__popup') && !target.closest('.choosenSort')) {
            setVisiblePopup(false);
        }
    };
    document.querySelector('body')?.addEventListener('click', outsidePopupClick);

    return () => {
      document.querySelector('body')?.removeEventListener('click', outsidePopupClick);
    }
  }, [])

  return (
    <div>
      <div className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span className="choosenSort" onClick={() => setVisiblePopup(!visiblePopup)}>{activSort.name + ` (${activSort.type.toUpperCase()})`}</span>
        </div>
        {
          visiblePopup ? 
          <div 
          className="sort__popup"
          ref={popupRef}
          >
            <ul>
              {
                sorts.map((sort: FilerObj) => 
                  <li 
                  className={activSort.name === sort.name && activSort.type === sort.type ? 'active': ''}
                  key={sort.name + sort.type}
                  onClick={() => hidePopap(sort)}
                  >
                    {sort.name + ` (${sort.type.toUpperCase()})`}
                  </li>
                  )
              }
            </ul>
          </div>:
          ''
        }
      </div>
    </div>
  )
}

export default Sorts;
