import { statusFilters } from '../../utils/constants.js';
import { Label, Text, Select } from './FilterSelector.styles';

export const FilterSelector = ({ setFilter, filter }) => {
  return (
    <Label title="Choosing the filter">
      <Text>Choose filter:</Text>
      <Select
        onChange={e => {
          setFilter(e.target.value);
        }}
        name="filters"
        defaultValue={filter}
      >
        <option value={statusFilters.all}>All</option>
        <option value={statusFilters.follow}>Follow</option>
        <option value={statusFilters.following}>Following</option>
      </Select>
    </Label>
  );
};
