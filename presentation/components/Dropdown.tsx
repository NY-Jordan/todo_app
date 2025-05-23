import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useOutsideClick from '@/Infrastructure/hooks/useOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string|null) => void;
}

const Dropdown = ({
  id,
  title = 'Select',
  data,
  position = 'bottom-left',
  hasImage,
  style,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem|null) => {
    if (item) {
      setSelectedItem(item);
      onSelect && onSelect(item.id);
      setIsOpen(false);
    } else {
      setSelectedItem(undefined);
      onSelect && onSelect(null);
      setIsOpen(false)
    }
  };
  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames(
    'absolute bg-white w-full max-h-52 overflow-y-auto py-3 rounded shadow-md z-10 dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-700',
    {
      'top-full right-0 mt-2': position === 'bottom-right',
      'top-full left-0 mt-2': position === 'bottom-left',
      'bottom-full right-0 mb-2': position === 'top-right',
      'bottom-full left-0 mb-2': position === 'top-left',
    }
  );

  return (
    <div ref={dropdownRef} className='relative dark:bg-gray-600'>
      <button
        id={id}
        aria-label='Toggle dropdown'
        aria-haspopup='true'
        aria-expanded={isOpen}
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'flex justify-between items-center gap-5 w-full rounded-md  h-12 px-4 border  dark:bg-gray-600 dark:border-gray-600 dark:text-white border-gray-300  text-black',
          style
        )}
      >
        {selectedItem?.imageUrl && <img
                    src={selectedItem.imageUrl}
                    alt='image'
                    loading='lazy'
                    className='w-8 h-8 rounded-full bg-gray-400 object-cover me-2'
                  />}
        <span>{selectedItem?.name || title}</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button> {/* Open */}
      {isOpen && (
        <div aria-label='Dropdown menu' className={dropdownClass}>
          <ul
            role='menu'
            aria-labelledby={id}
            aria-orientation='vertical'
            className='leading-10'
          >
            <li
                key={0}
                onClick={() => handleChange(null)}
                className={classNames(
                  'flex items-center cursor-pointer hover:bg-gray-200 px-3',
                  
                )}
              >
                {hasImage && (
                  <img
                    src={'/images/profile.jpg'}
                    alt='image'
                    loading='lazy'
                    className='w-8 h-8 rounded-full bg-gray-400 object-cover me-2'
                  />
                )}
                <span>All</span>
              </li>
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  'flex items-center cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 px-3',
                  { 'bg-gray-300': selectedItem?.id === item.id }
                )}
              >
                {hasImage && (
                  <img
                    src={item.imageUrl}
                    alt='image'
                    loading='lazy'
                    className='w-8 h-8 rounded-full bg-gray-400 object-cover me-2'
                  />
                )}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;