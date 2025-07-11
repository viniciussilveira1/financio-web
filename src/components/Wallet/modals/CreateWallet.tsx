import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { PiPlusCircleDuotone } from "react-icons/pi";
import TextInput from "@components/ui/TextInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createWallet } from "@services/api.routes";
import { useToast } from "@components/Provider/ToastProvider";

interface CreateWalletFormData {
  name: string;
  type: string;
}

export default function CreateWallet() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateWalletFormData>();

  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutate: createWalletMutation } = useMutation({
    mutationFn: createWallet,
    onSuccess: () => {
      addToast("Carteira criada com sucesso");
      onCancel();
    },
    onError: () => {
      addToast("Erro ao criar carteira", "error");
    },
  });

  const onSubmit = async (data: CreateWalletFormData) => {
    createWalletMutation(data);
  };

  const onCancel = () => {
    reset();
    closeModal();
  };

  return (
    <Modal
      title='Criar Nova Carteira'
      trigger={
        <Button onClick={openModal}>
          <PiPlusCircleDuotone size={24} />
          Criar Carteira
        </Button>
      }
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <TextInput
          label='Nome'
          id='name'
          required
          placeholder='Ex: Carteira Principal'
          error={errors.name?.message}
          {...register("name")}
        />

        <TextInput
          label='Tipo'
          id='type'
          required
          placeholder='Ex: Conta corrente'
          error={errors.type?.message}
          {...register("type")}
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
