import { useState } from "react";

export const useShowCreateCoffeeModal = () => {
  const [showCreateCoffeeModal, setShowCreateCoffeeModal] = useState(false);

  const handleClickToggleCreateCoffeeModal = () => {
    setShowCreateCoffeeModal(!showCreateCoffeeModal);
  };

  return {
    showCreateCoffeeModal,
    handleClickToggleCreateCoffeeModal,
  };
};
