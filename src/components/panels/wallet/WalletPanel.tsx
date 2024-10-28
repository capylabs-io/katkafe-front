import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useLayoutStore } from "@/stores/layoutStore";
import { useLoadingStore } from "@/stores/LoadingStore";
import { useSnackBarStore } from "@/stores/SnackBarStore";
import { useUserStore } from "@/stores/userStore";
import { Copy, X } from "lucide-react";
import React, { useState } from "react";
import { validate } from "multicoin-address-validator";
import { WalletType } from "@/types/wallet";
import { saveWallet } from "@/requests/wallet";
import { get } from "lodash";
import { sliceString } from "@/utils/helpers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CopyToClipboard from "react-copy-to-clipboard";

export const WalletPanel = () => {
  const show = useSnackBarStore((state) => state.show);
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const setShowWalletPanel = useLayoutStore(
    (state) => state.setShowWalletPanel
  );

  const [metamaskWallet, setMetamaskWallet] = useState("");
  const [phantomWallet, setPhantomWallet] = useState("");
  const [user, fetchUser] = useUserStore((state) => [
    state.user,
    state.fetchUser,
  ]);

  const showMetamaskInput = !user || !user.metamaskAddress;
  const showPhantomInput = !user || !user.phantomAddress;

  const handleSaveMetamaskAddress = async () => {
    if (!metamaskWallet && showMetamaskInput) {
      show("Metamask wallet address is required");
      return;
    }

    if (!validate(metamaskWallet, "eth")) {
      show("Invalid metamask wallet address");
      return;
    }

    await handleSaveWalletAddress(WalletType.METAMASK, metamaskWallet);
  };

  const handleSavePhantomAddress = async () => {
    if (!phantomWallet && showPhantomInput) {
      show("Phantom wallet address is required");
      return;
    }

    if (!validate(phantomWallet, "sol")) {
      show("Invalid phantom wallet address");
      return;
    }

    await handleSaveWalletAddress(WalletType.PHANTOM, phantomWallet);
  };

  const handleSaveWalletAddress = async (type: string, address: string) => {
    if (!type) {
      show("Invalid wallet type");
      return;
    }

    try {
      showLoading();
      const body = {
        type,
        walletAddress: address,
      };
      await saveWallet(body);
      await fetchUser();
      show("Save wallet address successfully");
    } catch (error) {
      console.error(error);
      show("Save wallet address failed!");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="bg-[#2e2e2e] w-full !max-w-screen h-full absolute z-10 p-4 top-0 flex justify-center items-center">
      <div className="rounded-3xl border-solid border-orange-90 border-4 h-fit mt-4 bg-orange-10 relative">
        <div className="absolute left-4 top-4 bg-[#fffde9] rounded-full border-[#ededed] cursor-pointer">
          <img
            className="w-6 h-6"
            src="/images/back.png"
            alt=""
            onClick={() => setShowWalletPanel(false)}
          />
        </div>
        <div className="p-4">
          <div className="text-center text-xl font-semibold">
            Wallet Address
          </div>
          <div className="text-bodyMd mt-1">
            Please enter your wallet address to participate in the
            project&apos;s airdrop.
          </div>
          <div className="text-bodyMd text-red-30 mt-1">
            <span className="mr-1 font-semibold underline">Notice:</span>You
            won&apos;t be able to edit it after saving. If you need to change
            it, please contact the admin.
          </div>
        </div>

        <div className="border-t border-[#E8DDBD] p-4">
          <div className="font-semibold">Metamask Address</div>
          {showMetamaskInput ? (
            <Input
              id="metamaskWallet"
              value={metamaskWallet}
              onChange={(e) => setMetamaskWallet(e.target.value)}
              className="bg-[#e8e7d9] border-2 border-gray-400 h-12 text-lg px-4 mt-2 overflow-x-scroll"
              placeholder="Enter your address"
            />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="bg-[#e8e7d9] border-2 border-gray-400 h-12 text-lg px-4 mt-2 flex items-center justify-between rounded-md">
                    {sliceString(get(user, "metamaskAddress", "-"), 12, 6)}
                    <CopyToClipboard
                      text={get(user, "phantomAddress", "-")}
                      onCopy={() => show("Copy successfully"!)}
                    >
                      <Copy size={20} className="cursor-pointer" />
                    </CopyToClipboard>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{get(user, "metamaskAddress", "-")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <div className="font-semibold mt-4">Phantom Address</div>
          {showPhantomInput ? (
            <Input
              id="phantomWallet"
              value={phantomWallet}
              onChange={(e) => setPhantomWallet(e.target.value)}
              className="bg-[#e8e7d9] border-2 border-gray-400 h-12 text-lg px-4 mt-2"
              placeholder="Enter your address"
            />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="bg-[#e8e7d9] border-2 border-gray-400 h-12 text-lg px-4 mt-2 flex items-center justify-between rounded-md">
                    {sliceString(get(user, "phantomAddress", "-"), 12, 6)}
                    <CopyToClipboard
                      text={get(user, "phantomAddress", "-")}
                      onCopy={() => show("Copy successfully"!)}
                    >
                      <Copy size={20} className="cursor-pointer" />
                    </CopyToClipboard>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{get(user, "phantomAddress", "-")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="p-4 border-t border-[#E8DDBD] flex items-center gap-x-4">
          {showMetamaskInput && (
            <Button
              onClick={handleSaveMetamaskAddress}
              customClassNames="text-lg font-medium min-h-10"
            >
              Save Metamask
            </Button>
          )}
          {showPhantomInput && (
            <Button
              onClick={handleSavePhantomAddress}
              customClassNames="text-lg font-medium min-h-10"
            >
              Save Phantom
            </Button>
          )}
          {!showMetamaskInput && !showPhantomInput && (
            <Button
              onClick={() => setShowWalletPanel(false)}
              customClassNames="text-lg font-medium min-h-10"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
