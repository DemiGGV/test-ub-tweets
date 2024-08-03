import styled from 'styled-components';

export const SectionBox = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 20px;
  transform: translateX(-${props => props.$offsetView}px);
  transition: transform 500ms ease-in-out;
  box-shadow: var(--shadows-main);
`;
