import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const OrderInstruction = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-[#424242]  text-white px-4 py-2 mb-5 rounded-md">
          📝 Order Instructions
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to Place an Order</DialogTitle>
            <DialogDescription className="space-y-2 text-sm">
              <strong>বাংলা নির্দেশনা:</strong> যদি আপনি কোন মেনু অর্ডার করতে
              চান, প্রথমে আপনাকে মেনু টাইমের পাশে থাকা চেকবক্সে টিক দিতে হবে।
              আপনি আপনার ইচ্ছামত দিনের যতগুলো মেনু চান, সিলেক্ট করতে পারবেন। যদি
              কোনো মেনু আপডেটের প্রয়োজন হয়, তাহলে প্রতিটি মেনুর নিচে থাকা
              টেক্সটবক্সে কাস্টম ইনপুট দিয়ে সেটি আপডেট করতে পারবেন। সবশেষে
              সাবমিট বাটনে ক্লিক করবেন। তবে মনে রাখবেন, চেকবক্স টিক না দিলে ঐ
              মেনুটি কাউন্ট হবে না।
              <strong>English Instructions:</strong> If you want to order a
              menu, you must first check the checkbox next to the menu time. You
              can select as many meals as you want for each day. If you feel
              that a meal needs to be updated, you can customize it using the
              textbox below each item. Finally, click the submit button. Note:
              If the checkbox is not selected, the meal will not be counted.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderInstruction;
