import styled from "styled-components";
import { DEFAULT_SPACE, GRAY1} from "../../../../utils/constants";

const StyledRepoListItemBox = styled.div`
    border-bottom: 1px solid ${GRAY1};
    padding: ${DEFAULT_SPACE} 0;
    margin: 0 ${DEFAULT_SPACE};
    & h4{
        margin-top: 4px;
    }

    & li{
        padding: 0px !important;
        display: flex;
        flex-direction: column;
        & >div{
            width: 100%;
        }
    }
    &:last-of-type{
        border-bottom: none;
    }
`;

export const StyledRepoListDetailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

export const StyleStarContainer = styled.span`
    margin: 8px 8px 4px 0;
    display:inline-block;
`;
export const StyledTagContainer = styled.span`
    margin: 2px 0;
    display: inline-block;
`;

export default StyledRepoListItemBox;