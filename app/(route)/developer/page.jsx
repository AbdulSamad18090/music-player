import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Globe, Github } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto p-6">
      <section className="mb-12">
        <h3 className="text-3xl font-semibold mb-6">
          Meet the mind behind the code
        </h3>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="/images/me3.jpg"
                alt="Developer profile"
                className="object-cover object-top"
              />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Abdul Samad</CardTitle>
              <CardDescription>Full-Stack Developer</CardDescription>
              <div className="flex max-w-[200px] md:max-w-xl overflow-x-auto gap-2 mt-2 scrollbar-hidden">
                <Badge>Next.js</Badge>
                <Badge>React</Badge>
                <Badge>JavaScript</Badge>
                <Badge>Node.js</Badge>
                <Badge>MongoDB</Badge>
                <Badge>Git</Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm mb-4">
              Hi, Im Full Stack Web Developer. I craft robust and scalable web
              applications using cutting-edge technologies. From responsive
              front-end designs to powerful back-end systems, I bring your
              vision to life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <Link href="mailto:abdulsamad18090@gmail.com" className="w-full">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                >
                  <Mail className="h-4 w-4" />
                  <span>abdulsamad18090@gmail.com</span>
                </Button>
              </Link>

              <Link
                href={"https://www.linkedin.com/in/abdul-samad-7b0069267/"}
                target="_blank"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Button>
              </Link>

              <Link
                href={"https://abdulsamad-portfolio.vercel.app/"}
                target="_blank"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                >
                  <Globe className="h-4 w-4" />
                  <span>Portfolio</span>
                </Button>
              </Link>

              <Link
                href={"https://github.com/AbdulSamad18090"}
                target="_blank"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </Button>
              </Link>
            </div>
          </CardContent>

          {/* <CardFooter className="flex justify-center border-t pt-6">
            <Button>View Full Portfolio</Button>
          </CardFooter> */}
        </Card>
      </section>
    </div>
  );
};

export default Page;
