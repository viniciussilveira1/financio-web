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
import { MovementCategory, MovementType } from "@interfaces/Movements";

interface CreateMovementFormData {
  description: string;
  category: MovementCategory;
  amount: number;
  type: MovementType;
  date: string;
  walletId: number;
}

const rendaCategories = [
  MovementCategory.SALARIO,
  MovementCategory.INVESTIMENTOS,
  MovementCategory.OUTROS,
];

const despesaCategories = [
  MovementCategory.ALIMENTACAO,
  MovementCategory.TRANSPORTE,
  MovementCategory.LAZER,
  MovementCategory.SAUDE,
  MovementCategory.MORADIA,
  MovementCategory.EDUCACAO,
  MovementCategory.OUTROS,
];

export default function CreateMovement({ walletId }: { walletId: number }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateMovementFormData>();

  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const type = watch("type");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };

  const { mutateAsync: createMovementMutation } = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      addToast("Movimentação criada com sucesso");
      refetchData("movements");
      onCancel();
    },
    onError: (error: any) => {
      const backendMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao criar movimentação";
      addToast(backendMessage, "error");
    },
  });

  const categoriesToShow =
    type === MovementType.RENDA ? rendaCategories : despesaCategories;

  const onSubmit = async (data: CreateMovementFormData) => {
    await createMovementMutation({ ...data, walletId });
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
          label='Valor'
          id='amount'
          type='number'
          required
          placeholder='Ex: 100.00'
          error={errors.amount?.message}
          {...register("amount", {
            required: "Valor é obrigatório",
            valueAsNumber: true,
            min: { value: 0.01, message: "Valor deve ser maior que zero" },
          })}
        />

        <div>
          <label htmlFor='type' className='block font-medium mb-1'>
            Tipo
          </label>
          <select
            id='type'
            {...register("type", { required: "Tipo é obrigatório" })}
            className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
          >
            <option value={MovementType.RENDA}>Renda</option>
            <option value={MovementType.DESPESA}>Despesa</option>
          </select>
          {errors.type && (
            <p className='text-red-500 text-sm mt-1'>{errors.type.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='category' className='block font-medium mb-1'>
            Categoria
          </label>
          <select
            id='category'
            {...register("category", { required: "Categoria é obrigatória" })}
            className='w-full p-3 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
          >
            {categoriesToShow.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0) + cat.slice(1).toLowerCase()}{" "}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.category.message}
            </p>
          )}
        </div>

        <TextInput
          label='Data'
          id='date'
          type='date'
          required
          error={errors.date?.message}
          {...register("date", { required: "Data é obrigatória" })}
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
