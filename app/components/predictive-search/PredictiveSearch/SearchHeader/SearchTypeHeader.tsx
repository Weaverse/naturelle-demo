import {IconSearch} from '~/components/Icon';
import {PredictiveSearchForm} from '../../SearchForm';
import { SearchTypeHeaderResults } from './SearchTypeHeaderResults';
import { Input } from '~/components/input';

interface PredictiveSearchProps {
  // Predictive search props
  isOpen?: boolean;
}

export function SearchTypeHeader(props: PredictiveSearchProps) {
  let {isOpen} = props;
  return (
    <div className="relative border-t border-border-subtle">
      <PredictiveSearchForm>
        {({fetchResults, inputRef}) => (
          <div className="mx-auto w-full max-w-[560px] p-6">
            <Input
              name="q"
              onChange={fetchResults}
              onFocus={fetchResults}
              onClear={fetchResults}
              placeholder="Enter a keyword"
              ref={inputRef}
              className="rounded border-2"
              prefixElement={
                <button type="submit" className="cursor-pointer">
                  <IconSearch
                    className="h-6 w-6 opacity-55"
                    viewBox="0 0 24 24"
                  />
                </button>
              }
              autoFocus={true}
            />
          </div>
        )}
      </PredictiveSearchForm>
      {isOpen && <SearchTypeHeaderResults />}
    </div>
  );
}
