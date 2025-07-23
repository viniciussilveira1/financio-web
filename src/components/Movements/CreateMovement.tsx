import { PiPlusCircleDuotone } from "react-icons/pi";
import TextInput from "@components/ui/TextInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createMovement } from "@services/api.routes";
import { useToast } from "@components/Provider/ToastProvider";
import { refetchData } from "@utils/queryClient";
import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
import { MovementCategory, MovementType } from "interfaces/Movements";

interface CreateMovementFormData {
  description: string;
  category: MovementCategory;
  amount: number;
  type: MovementType;
  date: string;
  walletId: number;
}

export default function CreateMovement() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMovementFormData>();

  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutate: createMovementMutation } = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      addToast("Movimentação criada com sucesso");
      refetchData("movements");
      onCancel();
    },
    onError: () => {
      addToast("Erro ao criar carteira", "error");
    },
  });

  const onSubmit = async (data: CreateMovementFormData) => {
    createMovementMutation(data);
  };

  const onCancel = () => {
    reset();
    closeModal();
  };

  return (
    <Modal
      title='Criar Nova Movimentação'
      trigger={
        <Button onClick={openModal}>
          <PiPlusCircleDuotone size={24} />
          Adicionar Movimentação
        </Button>
      }
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <TextInput
          label='Descrição'
          id='description'
          required
          placeholder='Ex: Alimentação'
          error={errors.description?.message}
          {...register("description")}
        />

        <TextInput
          label='Descrição'
          id='description'
          required
          placeholder='Ex: Alimentação'
          error={errors.description?.message}
          {...register("description")}
        />

        <TextInput
          label='Categoria'
          id='category'
          required
          placeholder='Ex: Alimentação'
          error={errors.category?.message}
          {...register("category")}
        />

        <div className='flex justify-end space-x-2 pt-4'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancelar
          </Button>
          <Button type='submit'>Confirmar</Button>
        </div>
      </form>
    </Modal>
  );
}
