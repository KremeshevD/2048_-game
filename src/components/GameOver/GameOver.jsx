import { ButtonBlock } from '../ButtonBlock/ButtonBlock';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import s from './GameOver.module.css';

export const GameOver = () => {
  return (
    <ModalWindow>
      <div className={s.container}>
        <div>No more avalable moves</div>
        <div className={s.buttons}>
          <ButtonBlock />
        </div>
      </div>
    </ModalWindow>
  );
};
