import { LoadBtn } from "./Button.styled"

export const LoadMoreBtn = ({onBtnClick}) => {
    return (
        <LoadBtn type="button" onClick={onBtnClick}>Load more</LoadBtn>
    )
}