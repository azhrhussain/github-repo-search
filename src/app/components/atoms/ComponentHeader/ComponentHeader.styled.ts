import styled from "styled-components";
import { DEFAULT_SPACE, GRAY1 } from "../../../../utils/constants";

const StyledComponentHeader = styled.header`
  padding: 0 ${DEFAULT_SPACE};
  border-bottom: 1px solid ${GRAY1};
`;

export const StyledResultSortingHeader = styled.div`
    padding: 0 ${DEFAULT_SPACE};

    position: relitive;

    & h3{
        font-weight: normal;
    }
`;

export const StyledLine = styled.div`
    border-bottom: 1px solid ${GRAY1};
    width: 100%;
`;

export default StyledComponentHeader;