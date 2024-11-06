import { useTheme } from "@/components/theme/theme-provider";

export const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      borderColor: state.isFocused ? '#dfdfdf !important' : state.isFocused ? '#dfdfdf !important' : null, 
      backgroundColor: 'var(--background)', 
      borderRadius: '4px',
      padding: '4px',
      borderWidth: '1px',
      boxShadow: 'none',
      outline: state.isFocused ? '3px solid #2a9d8f !important' : state.isFocused ? '#dfdfdf !important' : null, // Contorno sólido ao redor quando em foco
      outlineOffset: '3px'
    }),
    menu: (provided: any) => {
      const { theme } = useTheme();
      const backgroundColor = theme === 'dark' ? '#27272a' : '#ffffff'; // Verifique a propriedade correta
      return {
        ...provided,
        backgroundColor: backgroundColor,
      };
    },
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2a9d8f !important' : state.isFocused ? '#2a9d8f !important' : null, // Cores de fundo de seleção e foco
      color: state.isSelected ? 'black' : state.isFocused ? 'white' : null, // Cor do texto
      padding: '10px',
      borderRadius: '4px',
      cursor: 'pointer',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#003D52 !important',
      borderRadius: '9999px',
      padding: '0px 5px',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'white',
      backgroundColor: 'var(--background) !important', 
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: 'white',
      ':hover': {
        borderRadius: '9999px',
        backgroundColor: 'transparent !important',
        color: '#f0f0f0',
      },
    }),
  };
  