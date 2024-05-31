"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { ConnectButton } from "@/components/auth/connect-button";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";

export default function Home() {
  const { address } = useAccount();
  if (address) {
    return redirect("/welcome");
  }
  return (
    <div className="max-w-screen-md mx-auto">
      <Background />
      <section className="flex flex-col items-center gap-4">
        <Sunny />
        <div className="flex flex-col items-center gap-4">
          <Badge>Vote</Badge>
          <Heading variant={"h2"}>
            Retro Funding Round 4: Onchain Builders
          </Heading>
          <Text className="text-center">
            In this round of Retro Funding, badgeholders will vote on the
            metrics they think matter most when evaluating impact across the
            Superchain.
          </Text>

          <ConnectButton />
        </div>
      </section>
    </div>
  );
}

function Background() {
  return (
    <div
      className="min-w-[1496px] w-screen h-[1496px] left-1/2 -top-1/4 -translate-x-1/2 bg-center fixed inset-0 -z-10 bg-cover"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, #FFEFD1 2%, #FFD1D6 27.04%, #D2CBFF 59.3%, #9CFFE7 80.5%, #A6FFB4 100%)",
      }}
    />
  );
}

function Sunny() {
  return (
    <svg
      width="176"
      height="181"
      viewBox="0 0 176 181"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M142.734 155.579L120.577 146.628L100.815 175.755L86.6905 152.642C70.6505 168.036 62.557 173.815 59.5396 175.051C59.9633 163.168 57.9544 153.788 54.9785 142.43L33.9849 152.427L40.2932 129.009C31.0109 125.966 23.6448 123.985 16.2977 118.838L24.1496 100.794C16.8866 96.0335 11.1259 89.3781 6.85977 80.8518L25.6969 68.0772L19.6123 43.2881L42.1251 38.8362L49.6447 15.6606L71.6586 22.4029L90.6071 4.59455L103.063 22.0193L127.937 15.8221L130.02 37.305L156.546 45.5297L147.969 65.652L170.293 83.6557L154.469 96.6945L161.672 120.554L147.467 126.085"
        fill="url(#paint0_radial_1574_119690)"
      />
      <path
        d="M165.96 111.912C152.826 90.8116 143.377 69.2737 130.634 65.3745C117.892 61.4752 126.905 73.8812 132.081 82.8463C133.313 84.9799 160.689 114.507 163.719 117.257C166.024 119.658 167.644 115.479 165.96 111.912Z"
        fill="url(#paint1_radial_1574_119690)"
      />
      <path
        d="M131.723 107.602L123.929 78.9968L104.598 131.088L146.997 164.991L139.64 133.607L131.723 107.602Z"
        fill="url(#paint2_linear_1574_119690)"
      />
      <path
        d="M123.929 78.9968L131.723 107.602L139.64 133.607L146.997 164.991L164.734 116.579L123.929 78.9968Z"
        fill="url(#paint3_linear_1574_119690)"
      />
      <path
        d="M104.598 131.088L131.73 107.602L164.377 116.246L139.647 133.613L104.604 131.088H104.598Z"
        fill="url(#paint4_linear_1574_119690)"
      />
      <path
        d="M111.859 139.592C81.9637 142.815 81.3769 141.991 60.2304 123.994C54.8723 105.131 54.7414 91.7583 60.2304 90.645C73.8283 87.8871 90.5508 124.933 111.859 139.592Z"
        fill="url(#paint5_radial_1574_119690)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105.571 134.577C105.506 134.674 105.444 134.767 105.385 134.854L105.392 134.86L105.527 134.983C105.643 134.895 105.759 134.805 105.875 134.716C106.402 134.307 106.927 133.901 107.472 133.603C107.78 133.412 108.15 133.314 108.224 133.394C108.325 133.488 108.428 133.588 108.532 133.69C108.997 134.143 109.504 134.638 110.187 134.829C111.647 135.248 113.087 134.454 113.906 133.283L113.832 133.117C112.985 132.996 112.163 133.012 111.355 133.027C111.087 133.032 110.822 133.036 110.557 133.036C110.292 133.049 110.04 133.012 109.75 132.833L109.233 132.488C107.666 131.427 106.383 133.356 105.571 134.577ZM105.484 135.902C107.565 136.45 109.695 136.925 111.825 137.042C113.164 137.001 114.335 136.934 115.558 136.865L115.558 136.865C116.347 136.821 117.158 136.775 118.049 136.734L118.135 136.894C115.747 139.956 111.443 138.693 108.402 137.522C107.374 137.085 106.37 136.617 105.416 136.074L105.484 135.902ZM112.822 139.549C110.144 139.364 107.497 138.637 104.942 137.756L104.948 137.762L104.868 137.929C106.056 138.637 107.3 139.253 108.587 139.802C112.385 141.342 117.667 142.549 120.739 138.97L120.647 138.81C117.883 139.235 115.562 139.561 112.822 139.549ZM111.037 142.506C108.802 141.656 106.721 140.375 104.813 138.902V138.908L104.684 139.038C105.465 139.999 106.352 140.88 107.294 141.705C110.114 144.04 114.361 146.628 117.908 144.237L117.864 144.059C115.39 143.597 113.389 143.196 111.037 142.506Z"
        fill="url(#paint6_linear_1574_119690)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M160.191 116.664C160.967 114.767 161.2 112.709 161.12 110.688H161.127L160.942 110.664C160.468 112.29 159.92 113.941 159.089 115.389C158.64 115.996 158.245 116.514 157.854 117.026C157.332 117.71 156.818 118.383 156.195 119.246L156.263 119.418C158.042 119.64 159.674 118.309 160.191 116.664ZM162.844 111.31C162.998 113.836 162.746 116.442 161.687 118.801C160.954 120.785 158.953 122.338 156.805 122.214L156.737 122.042C156.895 121.873 157.052 121.706 157.209 121.541L157.209 121.54C159.239 119.386 161.089 117.422 161.878 114.464C162.216 113.441 162.438 112.382 162.66 111.303L162.844 111.316V111.31ZM163.817 111.784C165.288 115.099 166.883 121.673 162.272 123.188L162.148 123.047C162.561 122.018 162.844 121.198 163.06 120.33C163.657 118.598 164.069 116.719 163.921 114.809C163.903 113.824 163.78 112.832 163.632 111.834L163.811 111.778L163.817 111.784Z"
        fill="url(#paint7_linear_1574_119690)"
      />
      <path
        d="M69.9797 76.7549C75.5698 73.6251 78.7773 68.5917 79.9408 61.9255C80.9012 67.1377 82.4034 70.902 85.654 70.0641C81.9355 71.475 80.3841 73.6868 81.166 76.7487C78.6418 73.8038 74.714 74.2905 69.9797 76.7487V76.7549Z"
        fill="url(#paint8_radial_1574_119690)"
      />
      <path
        d="M108.71 70.4277C112.847 68.2898 115.599 64.5132 117.341 59.5352C117.637 65.3449 120.038 66.4539 123.436 65.3449C119.933 66.996 117.686 69.0107 119.311 72.1897C117.076 70.5694 113.703 69.8609 108.704 70.4338L108.71 70.4277Z"
        fill="url(#paint9_radial_1574_119690)"
      />
      <path
        d="M108.71 80.9507C105.921 83.0084 102.818 85.5775 99.2167 85.8055C95.7506 86.0211 91.6935 83.3534 88.9354 86.6618C86.3744 89.73 89.471 93.7777 92.3399 95.244C96.9634 97.6098 103.157 96.6672 107.516 94.1658C110.532 92.4346 112.675 89.6745 112.712 86.0889C112.73 83.8956 110.748 79.4474 108.71 80.9568V80.9507Z"
        fill="url(#paint10_radial_1574_119690)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1574_119690"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(92.339 82.2635) rotate(-141.168) scale(121.834 124.005)"
        >
          <stop offset="0.32941" stop-color="#F3F6FF" />
          <stop offset="0.425" stop-color="#D1DEFF" />
          <stop offset="0.54" stop-color="#C3BCFF" />
          <stop offset="0.809272" stop-color="#BA61FF" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_1574_119690"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(117.39 56.0798) rotate(50.615) scale(75.8391 73.1482)"
        >
          <stop offset="0.300408" stop-color="#F3F7FF" stop-opacity="0.19" />
          <stop offset="0.487657" stop-color="#D1DEFF" stop-opacity="0.5" />
          <stop offset="0.680078" stop-color="#C3BCFF" />
          <stop offset="0.905129" stop-color="#BA61FF" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_1574_119690"
          x1="118.272"
          y1="109.395"
          x2="150.698"
          y2="144.593"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#BDF7F3" />
          <stop offset="1" stop-color="#69BAE8" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_1574_119690"
          x1="104.598"
          y1="121.994"
          x2="164.734"
          y2="121.994"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EF5DA2" />
          <stop offset="1" stop-color="#69BAE8" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_1574_119690"
          x1="115.895"
          y1="97.5351"
          x2="142.239"
          y2="134.513"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.38" stop-color="#3786AA" />
          <stop offset="0.841079" stop-color="#84CED5" />
          <stop offset="1" stop-color="#A0D4A9" />
        </linearGradient>
        <radialGradient
          id="paint5_radial_1574_119690"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(53.7933 102.968) rotate(46.2141) scale(70.4052 91.9144)"
        >
          <stop offset="0.0811422" stop-color="#F3F7FF" stop-opacity="0" />
          <stop offset="0.313201" stop-color="#D1DEFF" stop-opacity="0.38" />
          <stop offset="0.618936" stop-color="#C3BCFF" />
          <stop offset="0.808975" stop-color="#BA61FF" />
        </radialGradient>
        <linearGradient
          id="paint6_linear_1574_119690"
          x1="104.684"
          y1="136.535"
          x2="118.823"
          y2="145.189"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#A54AEA" />
          <stop offset="1" stop-color="#7365EE" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_1574_119690"
          x1="162.86"
          y1="110.664"
          x2="158.103"
          y2="124.538"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7365EE" />
          <stop offset="0.878495" stop-color="#A54AEA" />
        </linearGradient>
        <radialGradient
          id="paint8_radial_1574_119690"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(84.3545 76.7549) rotate(-130.425) scale(22.1678 17.4866)"
        >
          <stop offset="0.303759" stop-color="#5991E9" />
          <stop offset="0.814207" stop-color="#685BDC" />
        </radialGradient>
        <radialGradient
          id="paint9_radial_1574_119690"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(112.785 72.1897) rotate(-40.0623) scale(13.9166 9.96682)"
        >
          <stop offset="0.16" stop-color="#598CE9" />
          <stop offset="0.822377" stop-color="#685BDC" />
        </radialGradient>
        <radialGradient
          id="paint10_radial_1574_119690"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(94.989 85.7549) rotate(-158.99) scale(29.8531 15.535)"
        >
          <stop offset="0.06" stop-color="#5991E9" />
          <stop offset="0.72" stop-color="#685BDC" />
        </radialGradient>
      </defs>
    </svg>
  );
}
