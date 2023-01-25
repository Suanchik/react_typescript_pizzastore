import React from 'react';

type CategoriesProps = {
  chooseACategory: (index: number) => void,
  activCategories: number
}

const Categories: React.FC<CategoriesProps> = React.memo(({chooseACategory, activCategories}) => {

  const categories: string[] = [
    'Все',
    'Мясные',
    'Веганские',
    'Острые',
    'Закрытые'
]

    return (
      <div className="categories">
        <ul>
          {
            categories.map((el: string, index: number) => 
              <li 
              key={index}
              className={activCategories === index ? 'active': ''}
              onClick={() => chooseACategory(index)}
              >
                {el}
              </li>
            )
          }
        </ul>
      </div>
    )
  })

export default Categories;