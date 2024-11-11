export interface ITransactionPayload {
  user_id: string;
  amount: number;
  transaction_hash?: string;
  status?: string;
}

export interface ITransactionResponse {
  hash: string;
  description: {
    aborted: boolean;
    compute_ph: {
      success: boolean;
      exit_code: number;
    };
    action: {
      success: boolean;
    };
  };
  out_msgs: { value: string }[];
}
