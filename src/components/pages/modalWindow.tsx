import React from 'react';
import { useDispatch } from 'react-redux';
import { UseTypedDispatch } from '../../@types/types';
import { deleteAllPizzas } from '../../state/reducers/cart';
import classes from './modalWindow.module.scss';

type ModalWindowProps = {
  setVisibleWindow: (isVisible: boolean) => void
}

const ModalWindow: React.FC<ModalWindowProps> = ({setVisibleWindow}) => {
    const dispatch = UseTypedDispatch()

    const closeWindow = (isDelete: boolean) => {
        if(isDelete) {
            dispatch(deleteAllPizzas())
        }
        setVisibleWindow(false)
    }

    const closeWindowWithOutsideClick = (e: Event) => {
      const evTarget: any = e.target
        if(evTarget.className.includes('modelBlock')) {
            setVisibleWindow(false)
        }
    }

  return (
    <div 
    className={classes.modelBlock}
    onClick={(e: any) => closeWindowWithOutsideClick(e)}
    >
      <div className={classes.modal}>
            <p>удалить все пиццы? {'( '}delete all pizzas?{' )'} </p>
            <div className={classes.buttons}>
                <button onClick={() => closeWindow(true)}>yes</button>
                <button onClick={() => closeWindow(false)}>no</button>
            </div>
      </div>
    </div>
  )
}

export default ModalWindow;